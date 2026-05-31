import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace with your Firebase config object from console.firebase.google.com
// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVtlq1sszqnrxf8Lki6CvFYAeCajRvTw8",
  authDomain: "tryon-440bc.firebaseapp.com",
  projectId: "tryon-440bc",
  storageBucket: "tryon-440bc.firebasestorage.app",
  messagingSenderId: "439701553840",
  appId: "1:439701553840:web:4d04786b4cfd78fb463175",
  measurementId: "G-DRC0T49WYY"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
