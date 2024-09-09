import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJlbCOiHGtVOj1BpYskbWZFDOzblUXjLE",
  authDomain: "biblioteca-8aa13.firebaseapp.com",
  projectId: "biblioteca-8aa13",
  storageBucket: "biblioteca-8aa13.appspot.com",
  messagingSenderId: "176646431629",
  appId: "1:176646431629:web:b07204b60ebdeda71793c4",
  measurementId: "G-4S3B3FY2QL"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };