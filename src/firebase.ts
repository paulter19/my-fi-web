import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2G0lmjsNeJ94l6y368E7v4vDcZdJCvUY",
    authDomain: "myfinance-f279c.firebaseapp.com",
    databaseURL: "https://myfinance-f279c.firebaseio.com", // This is for Realtime Database, not Firestore
    projectId: "myfinance-f279c",
    storageBucket: "myfinance-f279c.firebasestorage.app",
    messagingSenderId: "781311796228",
    appId: "1:781311796228:web:a526b587cf2667493f0151",
    measurementId: "G-CWMZFYHYLJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);

// Initialize Firestore
// Try default database first, but also log database info
export const db = getFirestore(app);

// Log database information
if (typeof window !== 'undefined') {
    console.log('Firestore initialized for project:', firebaseConfig.projectId);
    // Access internal database ID to see which database we're using
    const dbInfo = (db as { _databaseId?: { databaseId?: string; projectId?: string } })._databaseId;
    console.log('Database ID:', dbInfo?.databaseId || '(default)');
    console.log('Project ID:', dbInfo?.projectId);
}

// Also try to create a reference with explicit database ID if needed
// If your data is in a named database, you would use: getFirestore(app, 'database-name')
// But for default database, we use: getFirestore(app)
