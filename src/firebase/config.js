import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0MfRBvmCa7ZjDhn6lh633mgW4HPcpEmQ",
  authDomain: "demonstracao-firebase-ap-ea625.firebaseapp.com",
  databaseURL: "https://demonstracao-firebase-ap-ea625.firebaseio.com",
  projectId: "demonstracao-firebase-ap-ea625",
  storageBucket: "demonstracao-firebase-ap-ea625.appspot.com",
  messagingSenderId: "56689347197",
  appId: "1:56689347197:web:0490731f6916bd88c23f14"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
