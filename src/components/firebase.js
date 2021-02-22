import firebase from 'firebase';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDjqOQXhu0Y6hrYQL_RtjLiFW7AN9SKU2I",
    authDomain: "todoapp-w4.firebaseapp.com",
    projectId: "todoapp-w4",
    storageBucket: "todoapp-w4.appspot.com",
    messagingSenderId: "445668263798",
    appId: "1:445668263798:web:a54d7217bd8cef37ac1c57"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;