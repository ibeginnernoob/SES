// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANF77T47-mxuFl6HHKxXe4UyJizWTLeDQ",
  authDomain: "ses-backend-f2671.firebaseapp.com",
  projectId: "ses-backend-f2671",
  storageBucket: "ses-backend-f2671.firebasestorage.app",
  messagingSenderId: "251452098449",
  appId: "1:251452098449:web:59982c139be0b61bef3c30",
  measurementId: "G-N2KNDHTNWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {
  auth,
  provider
}