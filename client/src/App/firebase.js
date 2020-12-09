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

    // Create a new trainer
    doCreateNewTrainer = async (userCredentials) => 
    await this.db.doc(`/users/trainer/sys_trainers/${userCredentials.userId}`).set(userCredentials);

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
    // chat
    doGetMessages = (roomID, startPos, endPos) => {
        if (endPos === undefined) {
            if (startPos > -10 && startPos < 0)
                endPos = -1;
            else
                endPos = startPos + 9
        }
        this.db.collection(`/messages/${roomID}/dialogue`)
        .orderBy("createdAt", 'asc').limitToLast(endPos)
        .then(snap => {
            let result = [];
            // Loop through the list, parsing each item into an object
            for (var msg in snap)
                result.push(JSON.parse(snap[msg]));
            result.push(roomID);
            return result;
        }).catch(err => console.log(err));
    }
    doPushMessage = (data) => {
        this.db.collection(`/messages/${data.roomID}/dialogue`).add(JSON.stringify({
            who: data.isAdmin,
            what: data.msg,
            when: data.timestamp
        }));
    } 
    doSetDetails = function(data) {
        this.db.doc(`/messages/${data.roomID}/dialogue/details`).get()
        .then(snap => {
            if(snap.exists) {
                this.db.doc(`/messages/${data.roomID}/dialogue/details`)
                .update( {
                    'Name': data.Name,
                    'Email': data.Email,
                    'Phone': data.Phone
                })
            } else {
                this.db.doc(`/messages/${data.roomID}/dialogue/details`)
                .set( {
                    'Name': data.Name,
                    'Email': data.Email,
                    'Phone': data.Phone
                })
            }
        })
    } 
    doGetDetails = function(roomID) {
        this.db.doc(`/messages/${roomID}/dialogue/details`).get()
        .then(result => result)
        .catch(err => console.log(err))
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