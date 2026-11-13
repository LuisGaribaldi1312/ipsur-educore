import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, update, remove, onChildAdded, query, limitToLast } from 'firebase/database';
import { mergeEntities, mergeClassrooms } from './p2pSync';

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
  PAYMENTS: 'ipsur/payments',
  LOGINS: 'ipsur/recent_logins'
};

export const ensureArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  return Object.values(val).filter(Boolean);
};

/**
 * Uploads all local data to Firebase Realtime Database and reconciles bidirectionally
 */
export async function uploadAllLocalDataToCloud(localData) {
  if (!db) return;
  try {
    const snapshot = await get(ref(db, 'ipsur'));
    const cloudVal = snapshot.val() || {};

    const cloudUsers = ensureArray(cloudVal.users);
    const cloudClassrooms = ensureArray(cloudVal.classrooms);
    const cloudActivities = ensureArray(cloudVal.activities);
    const cloudPayments = ensureArray(cloudVal.payments);
    const cloudProcedures = ensureArray(cloudVal.procedures);
    const cloudNotifications = ensureArray(cloudVal.notifications);

    const mergedUsers = mergeEntities(cloudUsers, ensureArray(localData.users));
    const mergedClassrooms = mergeClassrooms(cloudClassrooms, ensureArray(localData.classrooms));
    const mergedActivities = mergeEntities(cloudActivities, ensureArray(localData.activities));
    const mergedPayments = mergeEntities(cloudPayments, ensureArray(localData.payments));
    const mergedProcedures = mergeEntities(cloudProcedures, ensureArray(localData.procedures));
    const mergedNotifications = mergeEntities(cloudNotifications, ensureArray(localData.notificationsList));

    await set(ref(db, 'ipsur'), {
      users: mergedUsers,
      classrooms: mergedClassrooms,
      activities: mergedActivities,
      payments: mergedPayments,
      procedures: mergedProcedures,
      notifications: mergedNotifications,
      lastUpdated: new Date().toISOString()
    });
    console.log('[IPSUR Firebase] Sincronización bidireccional completada con la nube.');
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
        onDataMerged({
          users: ensureArray(data.users),
          classrooms: ensureArray(data.classrooms),
          activities: ensureArray(data.activities),
          payments: ensureArray(data.payments),
          procedures: ensureArray(data.procedures),
          notifications: ensureArray(data.notifications)
        });
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
    let classrooms = ensureArray(snapshot.val());
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
    let classrooms = ensureArray(snapshot.val()).filter(c => c && c.id !== classroomId);
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
    let users = ensureArray(snapshot.val());
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
    let users = ensureArray(snapshot.val()).filter(u => u && u.id !== userId);
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
    let list = ensureArray(snapshot.val());
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

/**
 * Records a real-time login event to Firebase and alerts staff
 */
export async function recordUserLogin(user) {
  if (!db || !user?.id) return null;
  try {
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const now = new Date();
    const loginEvent = {
      id: `login-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userTitle: user.title || (user.role === 'student' ? 'Estudiante' : user.role === 'teacher' ? 'Docente Titular' : 'Directivo'),
      avatar: user.avatar || '',
      matricula: user.matricula || '',
      email: user.email || '',
      timestamp: now.toISOString(),
      timeString: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dateString: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      device: isMobile ? 'Teléfono Móvil' : 'Computadora / Laptop'
    };

    // Store under recent_logins
    await set(ref(db, `${DB_PATHS.LOGINS}/${loginEvent.id}`), loginEvent);
    return loginEvent;
  } catch (error) {
    console.warn('[IPSUR Firebase] Error registrando evento de login:', error.message);
    return null;
  }
}

/**
 * Subscribes to real-time login events to trigger MSN style notification
 */
export function subscribeToLoginEvents(onLoginDetected) {
  if (!db) return () => {};
  try {
    // Only capture events occurring after this client subscribed (within last 15 seconds)
    const subscriptionTime = Date.now() - 15000;
    const loginsRef = ref(db, DB_PATHS.LOGINS);
    const loginsQuery = query(loginsRef, limitToLast(25));

    const unsubscribe = onChildAdded(loginsQuery, (snapshot) => {
      const event = snapshot.val();
      if (event && event.timestamp) {
        const eventTime = new Date(event.timestamp).getTime();
        if (eventTime >= subscriptionTime && onLoginDetected) {
          onLoginDetected(event);
        }
      }
    });

    return unsubscribe;
  } catch (error) {
    console.warn('[IPSUR Firebase] Error suscribiendo a eventos de inicio de sesión:', error.message);
    return () => {};
  }
}
