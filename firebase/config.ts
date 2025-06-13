// firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ آپ کا Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD2eCtaRrU8hIlU-Day_wmO6dQHH8ioGHo",
  authDomain: "chatapp-f0db6.firebaseapp.com",
  projectId: "chatapp-f0db6",
  storageBucket: "chatapp-f0db6.firebasestorage.app",
  messagingSenderId: "732909222773",
  appId: "1:732909222773:web:8bc5da42c669241667f13c",
  measurementId: "G-QC2R2MRSVH"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Export Auth & Database
export const auth = getAuth(app);
export const db = getFirestore(app);
