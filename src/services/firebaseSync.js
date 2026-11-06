import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, update, remove } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAEyM8ValXbGXbAqE6H2KuY-xo5nUr_ElU",
  authDomain: "ipsur-educore-20c1f.firebaseapp.com",
  databaseURL: "https://ipsur-educore-20c1f-default-rtdb.firebaseio.com",
  projectId: "ipsur-educore-20c1f",
  storageBucket: "ipsur-educore-20c1f.firebasestorage.app",
  messagingSenderId: "853319376673",
  appId: "1:853319376673:web:e2a671b3b356c0dd9be860"
};

let app = null;
let db = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getDatabase(app);
} catch (error) {
  console.error('[IPSUR Firebase] Error inicializando Realtime Database:', error);
}

export { db };

export const DB_PATHS = {
  USERS: 'ipsur/users',
  CLASSROOMS: 'ipsur/classrooms',
  ACTIVITIES: 'ipsur/activities',
  NOTIFICATIONS: 'ipsur/notifications',
  PROCEDURES: 'ipsur/procedures',
  PAYMENTS: 'ipsur/payments'
};

/**
 * Uploads all local data to Firebase Realtime Database if cloud is empty or merges them
 */
export async function uploadAllLocalDataToCloud(localData) {
  if (!db) return;
  try {
    const snapshot = await get(ref(db, 'ipsur'));
    const cloudVal = snapshot.val();

    if (!cloudVal) {
      // Cloud is completely empty, populate with local state
      console.log('[IPSUR Firebase] Base de datos vacía, inicializando datos locales...');
      await set(ref(db, 'ipsur'), {
        users: localData.users || [],
        classrooms: localData.classrooms || [],
        activities: localData.activities || [],
        notifications: localData.notificationsList || [],
        procedures: localData.procedures || [],
        payments: localData.payments || [],
        lastUpdated: new Date().toISOString()
      });
    } else {
      // Cloud already has data: ensure users or classrooms are not missing
      const updates = {};
      if (Array.isArray(localData.users) && localData.users.length > 0 && (!cloudVal.users || cloudVal.users.length === 0)) {
        updates['ipsur/users'] = localData.users;
      }
      if (Array.isArray(localData.classrooms) && localData.classrooms.length > 0 && (!cloudVal.classrooms || cloudVal.classrooms.length === 0)) {
        updates['ipsur/classrooms'] = localData.classrooms;
      }
      if (Object.keys(updates).length > 0) {
        await update(ref(db), updates);
      }
    }
  } catch (error) {
    console.warn('[IPSUR Firebase] Aviso al sincronizar datos iniciales:', error.message);
  }
}

/**
 * Subscribes to Realtime Database changes across all devices (PC, Phone 4G, Tablet)
 */
export function subscribeToCloudData(onDataMerged) {
  if (!db) return () => {};
  try {
    const ipsurRef = ref(db, 'ipsur');
    const unsubscribe = onValue(ipsurRef, (snapshot) => {
      const data = snapshot.val();
      if (data && onDataMerged) {
        onDataMerged(data);
      }
    }, (error) => {
      console.warn('[IPSUR Firebase] Permisos o error en suscripción:', error.message);
    });
    return unsubscribe;
  } catch (error) {
    console.error('[IPSUR Firebase] Error en suscripción:', error);
    return () => {};
  }
}

/**
 * Saves a single classroom to Realtime Database
 */
export async function syncClassroomToCloud(classroom) {
  if (!db || !classroom?.id) return;
  try {
    const snapshot = await get(ref(db, DB_PATHS.CLASSROOMS));
    let classrooms = snapshot.val() || [];
    if (!Array.isArray(classrooms)) {
      classrooms = Object.values(classrooms);
    }
    const index = classrooms.findIndex(c => c && c.id === classroom.id);
    if (index >= 0) {
      classrooms[index] = classroom;
    } else {
      classrooms.unshift(classroom);
    }
    await set(ref(db, DB_PATHS.CLASSROOMS), classrooms);
  } catch (error) {
    console.warn('[IPSUR Firebase] Error sincronizando sala:', error.message);
  }
}

/**
 * Deletes a classroom from Realtime Database
 */
export async function deleteClassroomFromCloud(classroomId) {
  if (!db || !classroomId) return;
  try {
    const snapshot = await get(ref(db, DB_PATHS.CLASSROOMS));
    let classrooms = snapshot.val() || [];
    if (!Array.isArray(classrooms)) classrooms = Object.values(classrooms);
    classrooms = classrooms.filter(c => c && c.id !== classroomId);
    await set(ref(db, DB_PATHS.CLASSROOMS), classrooms);
  } catch (error) {
    console.warn('[IPSUR Firebase] Error eliminando sala de la nube:', error.message);
  }
}

/**
 * Saves or updates a user in Realtime Database
 */
export async function syncUserToCloud(user) {
  if (!db || !user?.id) return;
  try {
    const snapshot = await get(ref(db, DB_PATHS.USERS));
    let users = snapshot.val() || [];
    if (!Array.isArray(users)) users = Object.values(users);
    const index = users.findIndex(u => u && u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.unshift(user);
    }
    await set(ref(db, DB_PATHS.USERS), users);
  } catch (error) {
    console.warn('[IPSUR Firebase] Error sincronizando usuario:', error.message);
  }
}

/**
 * Deletes a user from Realtime Database
 */
export async function deleteUserFromCloud(userId) {
  if (!db || !userId) return;
  try {
    const snapshot = await get(ref(db, DB_PATHS.USERS));
    let users = snapshot.val() || [];
    if (!Array.isArray(users)) users = Object.values(users);
    users = users.filter(u => u && u.id !== userId);
    await set(ref(db, DB_PATHS.USERS), users);
  } catch (error) {
    console.warn('[IPSUR Firebase] Error eliminando usuario:', error.message);
  }
}

/**
 * Appends or updates an entity (activity, payment, procedure) in Realtime Database
 */
export async function syncItemToCloud(path, item) {
  if (!db || !item?.id) return;
  try {
    const snapshot = await get(ref(db, path));
    let list = snapshot.val() || [];
    if (!Array.isArray(list)) list = Object.values(list);
    const index = list.findIndex(i => i && i.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.unshift(item);
    }
    await set(ref(db, path), list);
  } catch (error) {
    console.warn(`[IPSUR Firebase] Error sincronizando item en ${path}:`, error.message);
  }
}
