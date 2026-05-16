import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })


export default firebase;
