importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config

// const firebaseConfig = {
//     apiKey: "AIzaSyDW2E975sqlALwHA2IwAITVCp95L8N2aS4",
//     authDomain: "demoparesh-3ac16.firebaseapp.com",
//     projectId: "demoparesh-3ac16",
//     storageBucket: "demoparesh-3ac16.appspot.com",
//     messagingSenderId: "459963173731",
//     appId: "1:459963173731:web:37d934b94b7c05bf912156"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCnIWbUvAk2dhkxDGZiaTnU95JXYQX-G7g",
    authDomain: "shiksha-d8cb0.firebaseapp.com",
    projectId: "shiksha-d8cb0",
    storageBucket: "shiksha-d8cb0.appspot.com",
    messagingSenderId: "941486633409",
    appId: "1:941486633409:web:c5183689f3e0ab2e90bf40",
    measurementId: "G-S69RMSE553"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background from notification", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

// import { FireWorker } from '@shiksha/common-lib'
// FireWorker();