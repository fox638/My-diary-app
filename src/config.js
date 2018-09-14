import firebase from 'firebase'

export const appName = 'mydiaryv1-bfeac'
export const firebaseConfig = {
    apiKey: "AIzaSyBEeuvoadz4svfxylIIZT4-lfbHA8DMgvk",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "877512590866"
}
firebase.initializeApp(firebaseConfig);