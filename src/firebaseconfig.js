// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTd9XIPwBdtHYg5KCDJCUU9JE0EK4Ujxw",
  authDomain: "senditdeli.firebaseapp.com",
  projectId: "senditdeli",
  storageBucket: "senditdeli.appspot.com",
  messagingSenderId: "654685970789",
  appId: "1:654685970789:web:c6211277a154f54b7cc18c",
  measurementId: "G-80ZE2NXGPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);