import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAyWteG8EdpLgyuz3do--kAd3AlsAge6yY',
  authDomain: 'music-c47cd.firebaseapp.com',
  projectId: 'music-c47cd',
  storageBucket: 'music-c47cd.appspot.com',
  appId: '1:628229143170:web:5d3273eaf3a038d6e5929b'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((error) => {
  console.log(`Firebase Persistence error ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')
export { auth, db, usersCollection, storage, songsCollection, commentsCollection }
