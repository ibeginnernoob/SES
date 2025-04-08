// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// replace with your own firebase details
const firebaseConfig = {
    apiKey: "your apiKey",
    authDomain: "your authDomain",
    projectId: "your projectId",
    storageBucket: "your storageBucket",
    messagingSenderId: "your messagingSenderId",
    appId: "your appId",
    measurementId: "your measurementId",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})
const provider = new GoogleAuthProvider()
const analytics = getAnalytics(app)

export { auth, provider }
