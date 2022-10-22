import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAgYv2491TltR5JtNm0JPyPiPArqZBnfWw",
  authDomain: "darilimoveis-f9973.firebaseapp.com",
  projectId: "darilimoveis-f9973",
  storageBucket: "darilimoveis-f9973.appspot.com",
  messagingSenderId: "1034086737718",
  appId: "1:1034086737718:web:98b68c1dd8cbbf1a6f7597",
  measurementId: "G-QP2Z9HDSW0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db }