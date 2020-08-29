import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD8OsvbP3uwjwXINjnnkjWpL91xn2Vaic4",
    authDomain: "savvy-pagoda-275511.firebaseapp.com",
    databaseURL: "https://savvy-pagoda-275511.firebaseio.com",
    projectId: "savvy-pagoda-275511",
    storageBucket: "savvy-pagoda-275511.appspot.com",
    messagingSenderId: "945386535919",
    appId: "1:945386535919:web:b82d5ad2c8f11e2ab3141a",
    measurementId: "G-5PB9KQ3JXF"
  };
 
  firebase.initializeApp(firebaseConfig);

  export default firebase