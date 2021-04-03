import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyC-ju908OEfvMZbE9V_uOLr08YdcolZ78U",
  authDomain: "avi-nails.firebaseapp.com",
  projectId: "avi-nails",
  storageBucket: "avi-nails.appspot.com",
  messagingSenderId: "1033670829858",
  appId: "1:1033670829858:web:f949abf72b4c80aa9da77b",
  measurementId: "G-WSE8P1XKQ7"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {
  db,
  googleAuthProvider,
  storage,
  firebase
}