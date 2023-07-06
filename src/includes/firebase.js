import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAyWteG8EdpLgyuz3do--kAd3AlsAge6yY',
  authDomain: 'music-c47cd.firebaseapp.com',
  projectId: 'music-c47cd',
  storageBucket: 'music-c47cd.appspot.com',
  appId: '1:628229143170:web:5d3273eaf3a038d6e5929b'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore();
const usersCollection = db.collection('users');


export {
  auth,
  db,
  usersCollection
};