import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyD2G0lmjsNeJ94l6y368E7v4vDcZdJCvUY",
    authDomain: "myfinance-f279c.firebaseapp.com",
    databaseURL: "https://myfinance-f279c.firebaseio.com",
    projectId: "myfinance-f279c",
    storageBucket: "myfinance-f279c.firebasestorage.app",
    messagingSenderId: "781311796228",
    appId: "1:781311796228:web:a526b587cf2667493f0151",
    measurementId: "G-CWMZFYHYLJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
