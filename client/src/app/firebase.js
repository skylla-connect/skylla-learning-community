import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAjENIM451OC_xgBv1uLi-XNbffD8hlh8",
    authDomain: "skylla-abe57.firebaseapp.com",
    databaseURL: "https://skylla-abe57.firebaseio.com",
    projectId: "skylla-abe57",
    storageBucket: "skylla-abe57.appspot.com",
    messagingSenderId: "192490377014",
    appId: "1:192490377014:web:4f2f11dc73dcf8f39f2d97",
    measurementId: "G-R45R1528WP"
  };
const config = {
apiKey: process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_AUTH_DOMAIN,
databaseURL: process.env.REACT_APP_DATABASE_URL,
projectId: process.env.REACT_APP_PROJECT_ID,
storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore()
}
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doCreateNewUser = async (userCredentials) => 
    await this.db.doc(`/users/trainee/users/${userCredentials.userId}`).set(userCredentials);

    doGetUserAdmin = (userId) => {
        this.db.doc(`/users/admin`)
        .where("uid", "===", userId)
        .limit(1)
        .get()
        .then(data => {
            return data
        }); 
    }
    doGetUserTrainer = (userId) => {
        this.db.doc(`/users/trainer`)
        .where("uid", "===", userId)
        .limit(1)
        .get()
        .then(data => {
            return data
        }); 
    }
    doGetUserTrainee = (userId) => {
        this.db.doc(`/users/trainee`)
        .where("uid", "===", userId)
        .limit(1)
        .get()
        .then(data => {
            return data
        }); 
    }
}
export default Firebase;
const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
    );
export { FirebaseContext, withFirebase };