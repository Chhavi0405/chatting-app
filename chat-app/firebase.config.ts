// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtQvl701mT87EBySeoGSLTSGPdDMaxSpQ",
  authDomain: "nextchatapp-99bb8.firebaseapp.com",
  projectId: "nextchatapp-99bb8",
  storageBucket: "nextchatapp-99bb8.appspot.com",
  messagingSenderId: "626979117954",
  appId: "1:626979117954:web:0ef69820f73346c93a0d9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)