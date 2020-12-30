importScripts("https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: 'AIzaSyAAjENIM451OC_xgBv1uLi-XNbffD8hlh8',
    authDomain:'skylla-abe57.firebaseapp.com',
    databaseURL: 'https://skylla-abe57.firebaseio.com',
    projectId: 'skylla-abe57',
    storageBucket: 'skylla-abe57.appspot.com',
    messagingSenderId: '192490377014',
    appId: '1:192490377014:web:4f2f11dc73dcf8f39f2d97', 
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
    body: payload.data.roomId,
    icon: '/firebase-logo.png'
    };
    return self.registration.showNotification(notificationTitle,
    notificationOptions);
    });
    self.addEventListener('notificationclick', event => {
    console.log(event)
    return event;
    });