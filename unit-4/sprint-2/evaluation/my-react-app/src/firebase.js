// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsAIpjLhMUMI23ji2eh1fbpT99RKTw1ag",
  authDomain: "mayeval.firebaseapp.com",
  projectId: "mayeval",
  storageBucket: "mayeval.firebasestorage.app",
  messagingSenderId: "621114251088",
  appId: "1:621114251088:web:62d963284d0ffc8c4abe55",
  measurementId: "G-Z6F8HSGC3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}