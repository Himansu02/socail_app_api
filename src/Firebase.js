import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7BRZpy5yVNWP7A7slLettG7qk_2X77Nw",
  authDomain: "connect-4d263.firebaseapp.com",
  projectId: "connect-4d263",
  storageBucket: "connect-4d263.appspot.com",
  messagingSenderId: "111968902269",
  appId: "1:111968902269:web:fc82a42b2509e1ed4b2514"
};

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app)

  const db=getFirestore(app);

  export  {db,app,auth};