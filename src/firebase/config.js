import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Default / Environment Firebase Configuration
// Values can be set via Vite environment variables (.env / Vercel Environment Variables)
// or stored locally via the in-app Firebase Setup modal
const getStoredConfig = () => {
  try {
    const local = localStorage.getItem('ipsur_firebase_config');
    if (local) return JSON.parse(local);
  } catch (e) {
    // Ignore
  }
  return null;
};

const storedConfig = typeof window !== 'undefined' ? getStoredConfig() : null;

export const firebaseConfig = storedConfig || {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId && 
  firebaseConfig.apiKey && 
  firebaseConfig.projectId !== ""
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('[IPSUR Cloud Sync] Firebase Firestore inicializado correctamente con proyecto:', firebaseConfig.projectId);
  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error al inicializar Firebase:', error);
  }
} else {
  console.info('[IPSUR Cloud Sync] Firebase no está configurado aún. Operando en modo local.');
}

export { app, db };

export const saveFirebaseConfig = (config) => {
  try {
    localStorage.setItem('ipsur_firebase_config', JSON.stringify(config));
    window.location.reload();
  } catch (e) {
    console.error('Error saving Firebase config', e);
  }
};
