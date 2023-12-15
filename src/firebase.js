// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyAyueKIRjjyQG0ZFe_BqD66o6Uv13K-Geo",
    authDomain: "msqdance-87134.firebaseapp.com",
    projectId: "msqdance-87134",
    storageBucket: "msqdance-87134.appspot.com",
    messagingSenderId: "1017788573080",
    appId: "1:1017788573080:web:2619ca1384f2abee4c77ed",
    measurementId: "G-LT19DNMNKB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Google analytics
const analytics = getAnalytics(app);
export const auth = getAuth(app)
// auth Provider
const provider = new GoogleAuthProvider()
// storage
export const storage = getStorage(app)
// Database
export const db = getFirestore(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider) // 1- auth , 2- provider (args)