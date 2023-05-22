
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_K3Rq0UBO9W48lqtdigNKKxflKkYn5aU",
  authDomain: "chat-app-fc998.firebaseapp.com",
  projectId: "chat-app-fc998",
  storageBucket: "chat-app-fc998.appspot.com",
  messagingSenderId: "778490020731",
  appId: "1:778490020731:web:d6c30fd8bc220a3e61f3de"
};
let app;
getApps().length === 0
  ? (app = initializeApp(firebaseConfig))
  : (app = getApp());

const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
