import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYCEjorfAqvvP-wkf9cEayym6bKVndd7g",
  authDomain: "capstagram-c0e24.firebaseapp.com",
  projectId: "capstagram-c0e24",
  storageBucket: "capstagram-c0e24.appspot.com",
  messagingSenderId: "694363628131",
  appId: "1:694363628131:web:3625bae0a0c75275ad8e56",
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export const createUser = (email, password, displayName) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};





