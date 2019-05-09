import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initialiseApp(firebaseConfig)

export default firebaseApp.firestore()
