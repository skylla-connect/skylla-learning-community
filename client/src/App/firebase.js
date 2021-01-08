import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APA_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore()
        this.messaging = app.messaging()
    }
    requestFirebaseNotificationPermission = () =>
    new Promise((resolve) => {
        this.messaging.getToken()
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        console.log(err);
      });
    });
    onMessageListener = () =>
    new Promise((resolve) => {
        this.messaging.onMessage((payload) => {
            console.log(payload);
        resolve(payload);
        });
    });
      
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
    doGetMessages = async (roomID, startPos, endPos) => {
        if (endPos === undefined) {
            if (startPos > -10 && startPos < 0)
                endPos = -1;
            else
                endPos = startPos + 9
        }
        return await this.db.collection(`/messages/${roomID}/dialogue`)
        .orderBy("createdAt", 'desc').limit(endPos).get()
        .then(snapshot => {
            let result = [];
            // Loop through the list, parsing each item into an object
            snapshot.docs.map(doc => {
                result.push(doc.data());
            })
            return result;
        }).catch(err => console.log(err));
    }
    doPushMessage = async (data) => {
        await this.db.collection(`/messages/${data.roomId}/dialogue`).add(data);
    } 
    doSetTokens = async function(data) {
        await this.db.doc(`/users/admin/tokens/${data.id}`).set(data)
    } 
    doGetTokens = async () => {
        return await this.db.collection(`/users/admin/tokens`).get()
    }  
    doGetAdmins = () => this.db.collection(`/users/admin/users`).get()  
    notifyAdmins = async (data) => await this.db.collection('/notifications').add(data)
    listenerNotify = () => this.db.collection('/notifications')
    .orderBy('createdAt', "desc").limit(1).get()
}
export default Firebase;
const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
    );
export { FirebaseContext, withFirebase };