// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase";
import 'firebase/firestore'

// const app = firebase.initializeApp ({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

const app = firebase.initializeApp ({
  apiKey: "AIzaSyBRg6SJMkF3WHO_NpqDRC40xi-PKZyCXqc",
  authDomain: "react-todo-d1f2e.firebaseapp.com",
  projectId: "react-todo-d1f2e",
  storageBucket: "react-todo-d1f2e.appspot.com",
  messagingSenderId: "346233837794",
  appId: "1:346233837794:web:aa45136f1bb4ee7a0066bb",
});

// console.log(process.env)
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export const db = app.firestore();


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };


// const app = firebase.initializeApp ({
//   apiKey: "AIzaSyBRg6SJMkF3WHO_NpqDRC40xi-PKZyCXqc",
//   authDomain: "react-todo-d1f2e.firebaseapp.com",
//   projectId: "react-todo-d1f2e",
//   storageBucket: "react-todo-d1f2e.appspot.com",
//   messagingSenderId: "346233837794",
//   appId: "1:346233837794:web:aa45136f1bb4ee7a0066bb",
// });