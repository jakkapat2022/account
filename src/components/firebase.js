// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq-GUhA3Gm3JwdjFN7RxVEBdHrRjLgIWg",
  authDomain: "account-books-27bf7.firebaseapp.com",
  projectId: "account-books-27bf7",
  storageBucket: "account-books-27bf7.appspot.com",
  messagingSenderId: "589251146939",
  appId: "1:589251146939:web:d54dc5f7db5d8ffa55259e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)