import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewforgeai-589d7.firebaseapp.com",
  projectId: "interviewforgeai-589d7",
  storageBucket: "interviewforgeai-589d7.firebasestorage.app",
  messagingSenderId: "685672671200",
  appId: "1:685672671200:web:d6426fa1c57fcfc01a2d85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
