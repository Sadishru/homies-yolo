// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJigixawNamm2Km91YvyuaGBSaaXXo-vI",
  authDomain: "homies-yolo.firebaseapp.com",
  projectId: "homies-yolo",
  storageBucket: "homies-yolo.appspot.com",
  messagingSenderId: "399526361377",
  appId: "1:399526361377:web:c443795ebcae654ef0a660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}