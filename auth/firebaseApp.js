// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import fbKey from "./firebaseKey.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcYnrCon6UKVhndgfF929gU4Xv3aJIdMc",
  authDomain: "finza-6a2e8.firebaseapp.com",
  projectId: "finza-6a2e8",
  storageBucket: "finza-6a2e8.appspot.com",
  messagingSenderId: "986689535973",
  appId: "1:986689535973:web:307874898964dc66e8390c",
  measurementId: "G-2CX88LM12C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
