import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
   apiKey: "AIzaSyAZES1OHhN46Ys-NVFWevBHOt7ezc9orbg",
   authDomain: "picpulse-ace4a.firebaseapp.com",
   projectId: "picpulse-ace4a",
   storageBucket: "picpulse-ace4a.appspot.com",
   messagingSenderId: "1040987623359",
   appId: "1:1040987623359:web:0d4c8635884425a0621b0a"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)