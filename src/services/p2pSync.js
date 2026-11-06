import { joinRoom, selfId } from '@trystero-p2p/torrent';

const APP_ID = 'ipsur-educore-p2p-v1';
const ROOM_NAME = 'ipsur-academic-mesh-2026';

let room = null;
let broadcastChannel = null;

// Callbacks registered by AppContext
let onStateMergeCallback = null;
let onPeerCountChangeCallback = null;

// Connected peers tracking
const connectedPeers = new Set();

// Action broadcasters
let sendSyncRequest = null;
let sendSyncPayload = null;
let sendLiveMutation = null;

// Local BroadcastChannel for instant same-device cross-tab sync
try {
  if (typeof window !== 'undefined' && window.BroadcastChannel) {
    broadcastChannel = new BroadcastChannel('ipsur_local_p2p_channel');
  }
} catch (e) {
  console.warn('[IPSUR P2P] BroadcastChannel no soportado:', e);
}

/**
 * Merges two lists of objects by ID and updatedAt timestamp
 */
export function mergeEntities(localList = [], incomingList = []) {
  const map = new Map();

  localList.forEach(item => {
    if (item?.id) {
      map.set(item.id, item);
    }
  });

  incomingList.forEach(incoming => {
    if (!incoming?.id) return;
    const existing = map.get(incoming.id);

    if (!existing) {
      map.set(incoming.id, incoming);
    } else {
      const existingTime = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
      const incomingTime = new Date(incoming.updatedAt || incoming.createdAt || 0).getTime();

      if (incomingTime >= existingTime) {
        // Incoming is newer or equal
        map.set(incoming.id, {
          ...existing,
          ...incoming
        });
      }
    }
  });

  return Array.from(map.values());
}

/**
 * Deep merge for Classrooms: preserves activities, submissions, materials, criteria
 */
export function mergeClassrooms(localClassrooms = [], incomingClassrooms = []) {
  const map = new Map();

  localClassrooms.forEach(c => {
    if (c?.id) map.set(c.id, c);
  });

  incomingClassrooms.forEach(incoming => {
    if (!incoming?.id) return;
    const existing = map.get(incoming.id);

    if (!existing) {
      map.set(incoming.id, incoming);
    } else {
      // Merge activities
      const activities = mergeEntities(existing.activities || [], incoming.activities || []);
      // Merge materials
      const materials = mergeEntities(existing.materials || [], incoming.materials || []);
      // Merge submissions
      const submissions = mergeEntities(existing.submissions || [], incoming.submissions || []);
      // Merge assessments
      const studentAssessments = {
        ...(existing.studentAssessments || {}),
        ...(incoming.studentAssessments || {})
      };

      const existingTime = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
      const incomingTime = new Date(incoming.updatedAt || incoming.createdAt || 0).getTime();
      const base = incomingTime >= existingTime ? incoming : existing;

      map.set(incoming.id, {
        ...base,
        activities,
        materials,
        submissions,
        studentAssessments,
        criteria: incoming.criteriaConfigured ? incoming.criteria : existing.criteria,
        criteriaConfigured: existing.criteriaConfigured || incoming.criteriaConfigured
      });
    }
  });

  return Array.from(map.values());
}

/**
 * Initializes the P2P Mesh Network over WebRTC DataChannels
 */
export function initP2PMesh({ getCurrentState, onMergeState, onPeersChange }) {
  if (typeof window === 'undefined') return;

  onStateMergeCallback = onMergeState;
  onPeerCountChangeCallback = onPeersChange;

  try {
    room = joinRoom({ appId: APP_ID }, ROOM_NAME);
    console.log(`[IPSUR P2P] Red Mesh P2P iniciada con ID local: ${selfId}`);

    // Create Action Channels
    const [sendReq, getReq] = room.makeAction('sync_req');
    const [sendPayload, getPayload] = room.makeAction('sync_payload');
    const [sendMutation, getMutation] = room.makeAction('live_mutation');

    sendSyncRequest = sendReq;
    sendSyncPayload = sendPayload;
    sendLiveMutation = sendMutation;

    // 1. Handle incoming sync requests from a newly connected peer
    getReq((_, senderPeerId) => {
      console.log(`[IPSUR P2P] Solicitud de sincronización recibida de: ${senderPeerId}`);
      const currentState = getCurrentState();
      sendPayload(currentState, senderPeerId);
    });

    // 2. Handle incoming state payloads (gossip response)
    getPayload((incomingState, senderPeerId) => {
      console.log(`[IPSUR P2P] Paquete de datos recibido de: ${senderPeerId}`);
      if (incomingState && onStateMergeCallback) {
        onStateMergeCallback(incomingState, senderPeerId);
      }
    });

    // 3. Handle live discrete mutations (real-time actions)
    getMutation((mutation, senderPeerId) => {
      console.log(`[IPSUR P2P] Mutación en vivo (${mutation.type}) de: ${senderPeerId}`);
      if (mutation && onStateMergeCallback) {
        onStateMergeCallback(mutation, senderPeerId, true);
      }
    });

    // Peer Lifecycle
    room.onPeerJoin(peerId => {
      connectedPeers.add(peerId);
      console.log(`[IPSUR P2P] Nuevo dispositivo conectado a la red: ${peerId} (Total: ${connectedPeers.size})`);
      if (onPeerCountChangeCallback) onPeerCountChangeCallback(connectedPeers.size, Array.from(connectedPeers));

      // As soon as a peer connects, request its latest state to sync differences!
      sendSyncRequest({ selfId, timestamp: Date.now() }, peerId);
    });

    room.onPeerLeave(peerId => {
      connectedPeers.delete(peerId);
      console.log(`[IPSUR P2P] Dispositivo desconectado: ${peerId} (Total: ${connectedPeers.size})`);
      if (onPeerCountChangeCallback) onPeerCountChangeCallback(connectedPeers.size, Array.from(connectedPeers));
    });

    // Handle local BroadcastChannel for multi-tab sync on same device
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'LOCAL_TAB_MUTATION' && onStateMergeCallback) {
          onStateMergeCallback(event.data.payload, 'local-tab', true);
        }
      };
    }

  } catch (error) {
    console.error('[IPSUR P2P] Error al inicializar la red P2P Mesh:', error);
  }
}

/**
 * Broadcasts a live mutation to all connected WebRTC peers and local browser tabs
 */
export function broadcastMutation(type, data) {
  const mutation = {
    type,
    data,
    senderId: selfId,
    timestamp: new Date().toISOString()
  };

  // 1. Broadcast over WebRTC P2P mesh
  if (sendLiveMutation) {
    try {
      sendLiveMutation(mutation);
    } catch (e) {
      console.warn('[IPSUR P2P] Error al transmitir mutación por WebRTC:', e);
    }
  }

  // 2. Broadcast across local browser tabs
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({
        type: 'LOCAL_TAB_MUTATION',
        payload: mutation
      });
    } catch (e) {
      // Ignore
    }
  }
}

/**
 * Manually forces a synchronization handshake with all peers
 */
export function triggerManualSync(getCurrentState) {
  if (sendSyncRequest && room) {
    try {
      sendSyncRequest({ selfId, timestamp: Date.now() });
      if (sendSyncPayload && getCurrentState) {
        sendSyncPayload(getCurrentState());
      }
      return true;
    } catch (e) {
      console.error('[IPSUR P2P] Error forzando sincronización:', e);
      return false;
    }
  }
  return false;
}

export function getPeerId() {
  return selfId;
}

export function getConnectedPeersCount() {
  return connectedPeers.size;
}
