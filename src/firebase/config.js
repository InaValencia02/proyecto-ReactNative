import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCxafsUPET7gi0KnKMqZLGwa74bElztVYo",
  authDomain: "proyecto-37a80.firebaseapp.com",
  projectId: "proyecto-37a80",
  storageBucket: "proyecto-37a80.appspot.com",
  messagingSenderId: "1000842986817",
  appId: "1:1000842986817:web:30f82bea47415e4cf94dc0"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()
