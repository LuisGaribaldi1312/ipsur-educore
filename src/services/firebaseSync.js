import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  deleteDoc, 
  writeBatch 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

const USERS_COLLECTION = 'ipsur_users';
const CLASSROOMS_COLLECTION = 'ipsur_classrooms';

/**
 * Checks if cloud Firestore has data. If completely empty, seeds initial data so
 * all new devices instantly load the complete academy catalog and staff.
 */
export async function seedInitialCloudDataIfEmpty(initialUsers = [], initialClassrooms = []) {
  if (!isFirebaseConfigured || !db) return;

  try {
    const usersSnap = await getDocs(collection(db, USERS_COLLECTION));
    if (usersSnap.empty && initialUsers.length > 0) {
      console.log('[IPSUR Cloud Sync] Sembrando usuarios iniciales en Firestore...');
      const batch = writeBatch(db);
      initialUsers.forEach(u => {
        const ref = doc(db, USERS_COLLECTION, String(u.id));
        batch.set(ref, u);
      });
      await batch.commit();
      console.log('[IPSUR Cloud Sync] Usuarios iniciales sembrados con éxito.');
    }

    const classroomsSnap = await getDocs(collection(db, CLASSROOMS_COLLECTION));
    if (classroomsSnap.empty && initialClassrooms.length > 0) {
      console.log('[IPSUR Cloud Sync] Sembrando salas virtuales iniciales en Firestore...');
      const batch = writeBatch(db);
      initialClassrooms.forEach(c => {
        const ref = doc(db, CLASSROOMS_COLLECTION, String(c.id));
        batch.set(ref, c);
      });
      await batch.commit();
      console.log('[IPSUR Cloud Sync] Salas virtuales sembradas con éxito.');
    }
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error al sembrar datos iniciales:', error);
  }
}

/**
 * Subscribes to real-time changes in Users collection across all devices
 */
export function subscribeToUsers(onUpdate) {
  if (!isFirebaseConfigured || !db) return () => {};

  try {
    const q = query(collection(db, USERS_COLLECTION));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList = [];
      snapshot.forEach(docSnap => {
        usersList.push(docSnap.data());
      });
      if (usersList.length > 0) {
        onUpdate(usersList);
      }
    }, (error) => {
      console.error('[IPSUR Cloud Sync] Error en listener de usuarios:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Fallo al suscribirse a usuarios:', error);
    return () => {};
  }
}

/**
 * Subscribes to real-time changes in Classrooms collection across all devices
 */
export function subscribeToClassrooms(onUpdate) {
  if (!isFirebaseConfigured || !db) return () => {};

  try {
    const q = query(collection(db, CLASSROOMS_COLLECTION));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const classroomsList = [];
      snapshot.forEach(docSnap => {
        classroomsList.push(docSnap.data());
      });
      if (classroomsList.length > 0) {
        onUpdate(classroomsList);
      }
    }, (error) => {
      console.error('[IPSUR Cloud Sync] Error en listener de salas:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Fallo al suscribirse a salas:', error);
    return () => {};
  }
}

/**
 * Persists a user (or updated user) to Firestore
 */
export async function syncUserToCloud(user) {
  if (!isFirebaseConfigured || !db || !user?.id) return;
  try {
    const ref = doc(db, USERS_COLLECTION, String(user.id));
    await setDoc(ref, user, { merge: true });
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error guardando usuario en la nube:', error);
  }
}

/**
 * Persists a classroom (or updated classroom) to Firestore
 */
export async function syncClassroomToCloud(classroom) {
  if (!isFirebaseConfigured || !db || !classroom?.id) return;
  try {
    const ref = doc(db, CLASSROOMS_COLLECTION, String(classroom.id));
    await setDoc(ref, classroom, { merge: true });
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error guardando sala en la nube:', error);
  }
}

/**
 * Deletes a classroom from Firestore
 */
export async function deleteClassroomFromCloud(classroomId) {
  if (!isFirebaseConfigured || !db || !classroomId) return;
  try {
    const ref = doc(db, CLASSROOMS_COLLECTION, String(classroomId));
    await deleteDoc(ref);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error eliminando sala de la nube:', error);
  }
}
