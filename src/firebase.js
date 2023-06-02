// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd_FSBVCdaXYN1iQyNLekrlOmAkdqlm0o",
  authDomain: "online-storage-88de0.firebaseapp.com",
  projectId: "online-storage-88de0",
  storageBucket: "online-storage-88de0.appspot.com",
  messagingSenderId: "805782077066",
  appId: "1:805782077066:web:f3b808be7d28a804197773",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const cloudStorage = getStorage(app);
