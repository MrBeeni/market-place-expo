import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwkHECulcbG12qU4XnSfyCYSb0OxirIh4",
  authDomain: "market-place-a28e6.firebaseapp.com",
  projectId: "market-place-a28e6",
  storageBucket: "market-place-a28e6.appspot.com",
  messagingSenderId: "487915170751",
  appId: "1:487915170751:web:e9c7b7f85d8b0de7990f0a",
  measurementId: "G-ZMMCZCKW52",
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
