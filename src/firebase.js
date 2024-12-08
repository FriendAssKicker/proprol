import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBn6Ntg3MJjkYsBKC689fCbD5sKJmgbSI4",
    authDomain: "project-f36f7.firebaseapp.com",
    projectId: "project-f36f7",
    storageBucket: "project-f36f7.firebasestorage.app",
    messagingSenderId: "181479550215",
    appId: "1:181479550215:web:1f521300bc7fe8702da9a2",
    measurementId: "G-X6J5NP5H3T"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };