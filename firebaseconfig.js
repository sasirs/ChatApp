// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7LjSymSb949hpLweSoeh0rKdYYNBqHQ8",
  authDomain: "chatapp-74135.firebaseapp.com",
  databaseURL: "https://chatapp-74135-default-rtdb.firebaseio.com",
  projectId: "chatapp-74135",
  storageBucket: "chatapp-74135.appspot.com",
  messagingSenderId: "295625410299",
  appId: "1:295625410299:web:ba1609e85e17c658a1125e",
  measurementId: "G-NS4P0HNJBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
