import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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

    doAddItemToCart = async (userCartDetails) => {
        return await this.db.doc(`/cart/${userCartDetails.userId}`).get()
        .then(data => {
            if (data.exists){
                return this.db
                .doc(`/cart/${userCartDetails.userId}/items/${userCartDetails.courseName}`)
                .set(userCartDetails);
            } else {
                return this.db.doc(`/cart/${userCartDetails.userId}`).set(userCartDetails);
            }
        });
    }
    doRemoveCartItem = async (userId, courseName) => 
    await this.db.doc(`/cart/${userId}/items/${courseName}`).delete();

    doGetUserCart = (userId) => 
     this.db.doc(`/cart/${userId}`).get();

     doRemoveUserCart = async (userId) => 
     await this.db.doc(`/cart/${userId}`).delete();

    doGetUserAdmin = (userId) => {
        return this.db.doc(`/users/admin/users/${userId}`)
        .get()
    }
    doGetUserTrainer = (userId) => {
        return this.db.doc(`/users/trainer/users/${userId}`)
        .get() 
    }
    doGetUserTrainee = (userId) => {
        return this.db.doc(`/users/trainee/users/${userId}`)
        .get() 
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