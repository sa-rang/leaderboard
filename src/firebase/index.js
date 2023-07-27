
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzKr_SMpaxBE6bD_tUCsn-_JPCxrOlAG0",
    authDomain: "leader-board-12e54.firebaseapp.com",
    projectId: "leader-board-12e54",
    storageBucket: "leader-board-12e54.appspot.com",
    messagingSenderId: "255725304602",
    appId: "1:255725304602:web:224f2b4d929e229b844aa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app);

export { auth, db }