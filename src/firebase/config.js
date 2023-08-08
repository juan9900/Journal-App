// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdWW9sAqcnxspznLF3MpdElXEiq54g0ck",
  authDomain: "journal-app-5ba4e.firebaseapp.com",
  projectId: "journal-app-5ba4e",
  storageBucket: "journal-app-5ba4e.appspot.com",
  messagingSenderId: "704827914046",
  appId: "1:704827914046:web:1ad8cb9b498f50e82d5e6f",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
