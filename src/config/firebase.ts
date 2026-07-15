import { initializeApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAuth, Auth } from 'firebase/auth';
import firebaseAppletConfig from '../../firebase-applet-config.json';

const firebaseConfig = {
  authDomain: firebaseAppletConfig.authDomain,
  projectId: firebaseAppletConfig.projectId,
  storageBucket: firebaseAppletConfig.storageBucket,
  messagingSenderId: firebaseAppletConfig.messagingSenderId,
  appId: firebaseAppletConfig.appId,
  measurementId: firebaseAppletConfig.measurementId,
  apiKey: firebaseAppletConfig.apiKey
};

// Safe initialization: never throw at module import time.
// If Firebase fails to init (bad key, network, restrictions), the app survives.
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;
let auth: Auth | null = null;
let firebaseError: Error | null = null;
let isFirebaseReady = false;

try {
  app = initializeApp(firebaseConfig);

  db = (firebaseAppletConfig as any).firestoreDatabaseId
    ? initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any, (firebaseAppletConfig as any).firestoreDatabaseId)
    : initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any);

  storage = getStorage(app);
  functions = getFunctions(app, 'us-central1');
  auth = getAuth(app);
  isFirebaseReady = true;
} catch (err) {
  firebaseError = err instanceof Error ? err : new Error(String(err));
  console.error('[Firebase] Initialization failed — app running in degraded mode:', firebaseError.message);
}

export { app, db, storage, functions, auth, isFirebaseReady, firebaseError };

export const chatbotConfig = {
  model: "gemini-3.1-flash-lite-preview",
  agencyAuditTarget: "www.happyhunterdigital.com",
  focus: "Key Advantages for a Digital Agency Website"
};
