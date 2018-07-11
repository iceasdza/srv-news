import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDazEFipKTcwhJRNcf6oDnFQxbWic5aoEk",
    authDomain: "srv-mobile-4ac1c.firebaseapp.com",
    databaseURL: "https://srv-mobile-4ac1c.firebaseio.com",
    projectId: "srv-mobile-4ac1c",
    storageBucket: "srv-mobile-4ac1c.appspot.com",
    messagingSenderId: "521326358441"
  };
  

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();