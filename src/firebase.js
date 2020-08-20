import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC6MOSEcfZeX90kbK-AovMUVxq5NPecFT4",
    authDomain: "facebook-messenger-clone-8cc6b.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-8cc6b.firebaseio.com",
    projectId: "facebook-messenger-clone-8cc6b",
    storageBucket: "facebook-messenger-clone-8cc6b.appspot.com",
    messagingSenderId: "158570390587",
    appId: "1:158570390587:web:066f1dddff20e51755a81e",
    measurementId: "G-758BHF8HDC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
