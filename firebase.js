// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2xA7TDeJMoZXTMRVJ1ivcZsw_exVxo_k",
    authDomain: "inkspace-1dc2d.firebaseapp.com",
    projectId: "inkspace-1dc2d",
    storageBucket: "inkspace-1dc2d.firebasestorage.app",
    messagingSenderId: "768066420879",
    appId: "1:768066420879:web:61d80c1547aaf634b330fa",
    measurementId: "G-HLZ3X8CM9F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
