// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7CBfseUhPhlAJMRR5PeWql1-LQpyN-Mg",
  authDomain: "dashkek2-da8b2.firebaseapp.com",
  projectId: "dashkek2-da8b2",
  storageBucket: "dashkek2-da8b2.firebasestorage.app",
  messagingSenderId: "241180402665",
  appId: "1:241180402665:web:586a502e833d1007cc6178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);