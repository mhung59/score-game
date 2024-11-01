// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD8z91qxEOCFEzmYhaJ8D3SM7aZLdFzA20",
    authDomain: "gamble-66df2.firebaseapp.com",
    databaseURL: "https://gamble-66df2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gamble-66df2",
    storageBucket: "gamble-66df2.firebasestorage.app",
    messagingSenderId: "17093321309",
    appId: "1:17093321309:web:ad70110cc5c1aee07163b4"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
