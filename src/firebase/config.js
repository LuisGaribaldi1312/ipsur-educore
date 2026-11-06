import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Official IPSUR EDUCORE Firebase Production Configuration
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAEyM8ValXbGXbAqE6H2KuY-xo5nUr_ElU",
  authDomain: "ipsur-educore-20c1f.firebaseapp.com",
  databaseURL: "https://ipsur-educore-20c1f-default-rtdb.firebaseio.com",
  projectId: "ipsur-educore-20c1f",
  storageBucket: "ipsur-educore-20c1f.firebasestorage.app",
  messagingSenderId: "853319376673",
  appId: "1:853319376673:web:e2a671b3b356c0dd9be860"
};

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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || DEFAULT_FIREBASE_CONFIG.databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId && 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "" &&
  firebaseConfig.projectId !== ""
);

let app = null;
let db = null;
let rtdb = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    
    // Initialize Realtime Database (Active in console)
    try {
      rtdb = getDatabase(app, firebaseConfig.databaseURL);
      console.log('[IPSUR Cloud Sync] Realtime Database conectado en tiempo real:', firebaseConfig.databaseURL);
    } catch (e) {
      console.warn('[IPSUR Cloud Sync] RTDB no disponible:', e);
    }

    // Initialize Cloud Firestore as companion
    try {
      db = getFirestore(app);
      console.log('[IPSUR Cloud Sync] Cloud Firestore inicializado');
    } catch (e) {
      console.warn('[IPSUR Cloud Sync] Firestore no disponible:', e);
    }

  } catch (error) {
    console.error('[IPSUR Cloud Sync] Error al inicializar Firebase:', error);
  }
} else {
  console.info('[IPSUR Cloud Sync] Firebase operando en modo local.');
}

export { app, db, rtdb };

export const saveFirebaseConfig = (config) => {
  try {
    localStorage.setItem('ipsur_firebase_config', JSON.stringify(config));
    window.location.reload();
  } catch (e) {
    console.error('Error saving Firebase config', e);
  }
};
