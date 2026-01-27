// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// REPLACE THESE VALUES WITH THE ONES FROM YOUR FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyAjb-zCuKRduJHdfhZmXVb8IUaRP_P_6LY",
  authDomain: "ra-consulting-app.firebaseapp.com",
  projectId: "ra-consulting-app",
  storageBucket: "ra-consulting-app.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456..."
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Export the Auth tool so we can use it in LoginView.vue
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();