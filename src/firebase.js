// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, doc } from "firebase/firestore";
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
export const auth = getAuth(app);
// auth Provider
const provider = new GoogleAuthProvider();
// storage
export const storage = getStorage(app);
// Database
export const db = getFirestore(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider); // 1- auth , 2- provider (args)

//TODO: La nomenclatura que yo uso es:
/**
 * - Las referencias de collecciones siempre las empiezo con "coll" y luego el nombre que las define.
 * - Las referencias de documentos las empiezo con "ref" y luego el nombre que las define.
 * 
 * Asi cuando quiero una referencia con poner "coll" el intellisense ya te muestra todas las referncias
 * a collecciones que tienes creadas. 
 */
//Collection references
export const collUsers = collection(db, "users");
export const collTwitchLinks = collection(db, "twitchLinks");
export const collOrders = collection(db, "orders")

//Doc references
//TODO: Tambien recuerda que la referencia es a un documento, no te importa si se va a crear, actualizar o borrar.
//TODO: Lo digo porque en la pagina de Login llamabas a la referencia "newUserRef" y al final la referencia es al doc, da igual si es nuevo, existe o que. ;)
export const refUser = (userId) => doc(collUsers, userId)
