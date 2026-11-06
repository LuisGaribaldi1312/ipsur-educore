import { 
  ref, 
  set, 
  update, 
  onValue, 
  remove, 
  get 
} from 'firebase/database';
import { rtdb, isFirebaseConfigured } from '../firebase/config';

const USERS_PATH = 'ipsur_users';
const CLASSROOMS_PATH = 'ipsur_classrooms';

/**
 * Checks if Realtime Database has data. If empty, seeds current local data
 * so all new devices instantly load the complete academy catalog and staff.
 */
export async function uploadAllLocalDataToCloud(localUsers = [], localClassrooms = []) {
  if (!isFirebaseConfigured || !rtdb) return;

  try {
    const rootSnapshot = await get(ref(rtdb));
    const currentData = rootSnapshot.val() || {};

    const updates = {};
    if (!currentData[USERS_PATH] && localUsers.length > 0) {
      const usersMap = {};
      localUsers.forEach(u => {
        if (u?.id) usersMap[u.id] = u;
      });
      updates[USERS_PATH] = usersMap;
    }

    if (!currentData[CLASSROOMS_PATH] && localClassrooms.length > 0) {
      const classroomsMap = {};
      localClassrooms.forEach(c => {
        if (c?.id) classroomsMap[c.id] = c;
      });
      updates[CLASSROOMS_PATH] = classroomsMap;
    }

    if (Object.keys(updates).length > 0) {
      await update(ref(rtdb), updates);
      console.log('[IPSUR Cloud Sync] Datos iniciales sincronizados en Realtime Database con éxito.');
    }
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error al sincronizar datos en Realtime Database:', error);
  }
}

/**
 * Subscribes to real-time changes in Users across all devices (PC, Cell phone, Tablet)
 */
export function subscribeToUsers(onUpdate) {
  if (!isFirebaseConfigured || !rtdb) return () => {};

  try {
    const usersRef = ref(rtdb, USERS_PATH);
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
    const classroomsRef = ref(rtdb, CLASSROOMS_PATH);
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
 * Persists a user (or updated user) to Realtime Database
 */
export async function syncUserToCloud(user) {
  if (!isFirebaseConfigured || !rtdb || !user?.id) return;
  try {
    const userRef = ref(rtdb, `${USERS_PATH}/${user.id}`);
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
    const classRef = ref(rtdb, `${CLASSROOMS_PATH}/${classroom.id}`);
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
    const classRef = ref(rtdb, `${CLASSROOMS_PATH}/${classroomId}`);
    await remove(classRef);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error eliminando sala de RTDB:', error);
  }
}

export const seedInitialCloudDataIfEmpty = uploadAllLocalDataToCloud;

