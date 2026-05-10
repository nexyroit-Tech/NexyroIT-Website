import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAj694cxslLn0mh8AO16Y7LoT_nS3hhNcg",
    authDomain: "nexyro-it-2e3b2.firebaseapp.com",
    projectId: "nexyro-it-2e3b2",
    storageBucket: "nexyro-it-2e3b2.firebasestorage.app",
    messagingSenderId: "377629330149",
    appId: "1:377629330149:web:fd32137df5ce565644a20c",
    measurementId: "G-EZSEL381K4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
