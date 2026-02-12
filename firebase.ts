
// Use Firebase compat layer as modular exports are missing in the current environment
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQ67mSV8yS21wwRk5OWwMVBuBk1TjO3pc",
  authDomain: "guidepro-48e6c.firebaseapp.com",
  databaseURL: "https://guidepro-48e6c-default-rtdb.firebaseio.com",
  projectId: "guidepro-48e6c",
  storageBucket: "guidepro-48e6c.firebasestorage.app",
  messagingSenderId: "515042970987",
  appId: "1:515042970987:web:ea07e2eb5281f16a15902e",
  measurementId: "G-7FMSYPEJ24"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
