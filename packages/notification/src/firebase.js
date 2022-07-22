import { initializeApp } from 'firebase/app'
//import 'firebase/messaging'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// const firebaseConfig = {
//     apiKey: 'AIzaSyDW2E975sqlALwHA2IwAITVCp95L8N2aS4',
//     authDomain: 'demoparesh-3ac16.firebaseapp.com',
//     projectId: 'demoparesh-3ac16',
//     storageBucket: 'demoparesh-3ac16.appspot.com',
//     messagingSenderId: '459963173731',
//     appId: '1:459963173731:web:37d934b94b7c05bf912156'
// }

const firebaseConfig = {
    apiKey: "AIzaSyCnIWbUvAk2dhkxDGZiaTnU95JXYQX-G7g",
    authDomain: "shiksha-d8cb0.firebaseapp.com",
    projectId: "shiksha-d8cb0",
    storageBucket: "shiksha-d8cb0.appspot.com",
    messagingSenderId: "941486633409",
    appId: "1:941486633409:web:c5183689f3e0ab2e90bf40",
    measurementId: "G-S69RMSE553"
};

initializeApp(firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

//const publicKey = 'BEX47b856ssFWemDHoDRcVoloLdY4fx8v9FUvVgoYabZbJjteLH3KpgrhbG5wHvLyoovUDivC6Tuebzs33wjcVo'
const publicKey = 'BFls0-nyyXAB7s9cuDx42ROIIoLD-N_pby0lh3clKxHgpsRdZtLpNRFD_n5Y5crh8o_6yiGPXgG60stW1xel2Hg'

export const getUserToken = async (basePath = '') => {
    const path = basePath + '/firebase-messaging-sw.js'
    const serviceWorkerRegistration = await navigator.serviceWorker.register(path)
    return await getToken(messaging, {
        vapidKey: publicKey,
        serviceWorkerRegistration
    })
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })