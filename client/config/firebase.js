import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyAAjENIM451OC_xgBv1uLi-XNbffD8hlh8",
    authDomain: "skylla-abe57.firebaseapp.com",
    databaseURL: "https://skylla-abe57.firebaseio.com",
    projectId: "skylla-abe57",
    storageBucket: "skylla-abe57.appspot.com",
    messagingSenderId: "192490377014",
    appId: "1:192490377014:web:4f2f11dc73dcf8f39f2d97",
    measurementId: "G-R45R1528WP"
});


let db = firebase.firestore()


export default {
  firebase, db
}