import { 
  ref, 
  set, 
  update, 
  onValue, 
  remove, 
  get 
} from 'firebase/database';
import { rtdb, isFirebaseConfigured } from '../firebase/config';

export const PATHS = {
  USERS: 'ipsur_users',
  CLASSROOMS: 'ipsur_classrooms',
  ACTIVITIES: 'ipsur_activities',
  NOTIFICATIONS: 'ipsur_notifications',
  PROCEDURES: 'ipsur_procedures',
  PAYMENTS: 'ipsur_payments'
};

/**
 * Uploads and merges ALL local data from this device into Realtime Database
 * so that any user, classroom, payment or activity already created on this PC
 * is immediately live in the cloud and visible on mobile phones.
 */
export async function uploadAllLocalDataToCloud({
  users = [],
  classrooms = [],
  activities = [],
  notifications = [],
  procedures = [],
  payments = []
}) {
  if (!isFirebaseConfigured || !rtdb) return;

  try {
    const rootSnapshot = await get(ref(rtdb));
    const currentData = rootSnapshot.val() || {};
    const existingUsers = currentData[PATHS.USERS] || {};
    const existingClassrooms = currentData[PATHS.CLASSROOMS] || {};

    const updates = {};

    // 1. Merge Users
    users.forEach(u => {
      if (u?.id) {
        updates[`${PATHS.USERS}/${u.id}`] = {
          ...(existingUsers[u.id] || {}),
          ...u
        };
      }
    });

    // 2. Merge Classrooms (including activities, submissions, materials, attendance)
    classrooms.forEach(c => {
      if (c?.id) {
        updates[`${PATHS.CLASSROOMS}/${c.id}`] = {
          ...(existingClassrooms[c.id] || {}),
          ...c
        };
      }
    });

    // 3. Seed activities, notifications, procedures, payments if empty in cloud
    if (!currentData[PATHS.ACTIVITIES] && activities.length > 0) {
      const actMap = {};
      activities.forEach(a => { if (a?.id) actMap[a.id] = a; });
      updates[PATHS.ACTIVITIES] = actMap;
    }

    if (!currentData[PATHS.NOTIFICATIONS] && notifications.length > 0) {
      const notifMap = {};
      notifications.forEach(n => { if (n?.id) notifMap[n.id] = n; });
      updates[PATHS.NOTIFICATIONS] = notifMap;
    }

    if (!currentData[PATHS.PROCEDURES] && procedures.length > 0) {
      const procMap = {};
      procedures.forEach(p => { if (p?.id) procMap[p.id] = p; });
      updates[PATHS.PROCEDURES] = procMap;
    }

    if (!currentData[PATHS.PAYMENTS] && payments.length > 0) {
      const payMap = {};
      payments.forEach(p => { if (p?.id) payMap[p.id] = p; });
      updates[PATHS.PAYMENTS] = payMap;
    }

    if (Object.keys(updates).length > 0) {
      await update(ref(rtdb), updates);
      console.log(`[IPSUR Cloud Sync] Sincronización completa: ${Object.keys(updates).length} ramas enviadas a la nube.`);
    }
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error en uploadAllLocalDataToCloud:', error);
  }
}

/**
 * Subscribes to real-time changes in Users across all devices (PC, Cell phone, Tablet)
 */
export function subscribeToUsers(onUpdate) {
  if (!isFirebaseConfigured || !rtdb) return () => {};

  try {
    const usersRef = ref(rtdb, PATHS.USERS);
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.values(data);
        if (usersList.length > 0) {
          onUpdate(usersList);
        }
      }
    }, (error) => {
      console.error('[IPSUR Cloud Sync] Error en listener RTDB de usuarios:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Fallo al suscribirse a usuarios RTDB:', error);
    return () => {};
  }
}

/**
 * Subscribes to real-time changes in Classrooms across all devices
 */
export function subscribeToClassrooms(onUpdate) {
  if (!isFirebaseConfigured || !rtdb) return () => {};

  try {
    const classroomsRef = ref(rtdb, PATHS.CLASSROOMS);
    const unsubscribe = onValue(classroomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const classroomsList = Object.values(data);
        if (classroomsList.length > 0) {
          onUpdate(classroomsList);
        }
      }
    }, (error) => {
      console.error('[IPSUR Cloud Sync] Error en listener RTDB de salas:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Fallo al suscribirse a salas RTDB:', error);
    return () => {};
  }
}

/**
 * Subscribes to collection list for activities, procedures, payments
 */
export function subscribeToPath(pathKey, onUpdate) {
  if (!isFirebaseConfigured || !rtdb) return () => {};

  try {
    const itemRef = ref(rtdb, pathKey);
    const unsubscribe = onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        onUpdate(list);
      }
    });
    return unsubscribe;
  } catch (e) {
    return () => {};
  }
}

/**
 * Persists a user (or updated user) to Realtime Database
 */
export async function syncUserToCloud(user) {
  if (!isFirebaseConfigured || !rtdb || !user?.id) return;
  try {
    const userRef = ref(rtdb, `${PATHS.USERS}/${user.id}`);
    await set(userRef, user);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error guardando usuario en RTDB:', error);
  }
}

/**
 * Persists a classroom (or updated classroom) to Realtime Database
 */
export async function syncClassroomToCloud(classroom) {
  if (!isFirebaseConfigured || !rtdb || !classroom?.id) return;
  try {
    const classRef = ref(rtdb, `${PATHS.CLASSROOMS}/${classroom.id}`);
    await set(classRef, classroom);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error guardando sala en RTDB:', error);
  }
}

/**
 * Deletes a classroom from Realtime Database
 */
export async function deleteClassroomFromCloud(classroomId) {
  if (!isFirebaseConfigured || !rtdb || !classroomId) return;
  try {
    const classRef = ref(rtdb, `${PATHS.CLASSROOMS}/${classroomId}`);
    await remove(classRef);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error eliminando sala de RTDB:', error);
  }
}

/**
 * Saves a single item to a path (e.g. payment, procedure, activity)
 */
export async function syncItemToCloud(pathKey, item) {
  if (!isFirebaseConfigured || !rtdb || !item?.id) return;
  try {
    const itemRef = ref(rtdb, `${pathKey}/${item.id}`);
    await set(itemRef, item);
  } catch (error) {
    console.error(`[IPSUR Cloud Sync] Error guardando item en ${pathKey}:`, error);
  }
}

export const seedInitialCloudDataIfEmpty = uploadAllLocalDataToCloud;
