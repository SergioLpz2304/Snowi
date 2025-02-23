import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEqRf8KnmFL1X-VxwGoLCxnPHMUxSqNaA",
    authDomain: "snowi-b249b.firebaseapp.com",
    projectId: "snowi-b249b",
    storageBucket: "snowi-b249b.firebasestorage.app",
    messagingSenderId: "138820944893",
    appId: "1:138820944893:web:c996384d01d6b5f8bc4f94"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };