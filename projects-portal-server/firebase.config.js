import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-V67KGP5q7he_ugyYTJQHvfzx2BbeNWA",
  authDomain: "polyprojects-ff9f0.firebaseapp.com",
  projectId: "polyprojects-ff9f0",
  storageBucket: "polyprojects-ff9f0.appspot.com",
  messagingSenderId: "873075287581",
  appId: "1:873075287581:web:3c293f057c5cbf30aac8f4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

