import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQACHACJW5ndSKWIDEldHzG7rdXXZuung",
  authDomain: "medimap-ai.firebaseapp.com",
  projectId: "medimap-ai",
  storageBucket: "medimap-ai.appspot.com",  // Fix: Use "appspot.com" instead of "firebasestorage.app"
  messagingSenderId: "645463452859",
  appId: "1:645463452859:web:95196520e3fabc3ac18d9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore for storing user data

export { auth, db };
