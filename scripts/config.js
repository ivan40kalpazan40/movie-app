const firebaseConfig = {
    apiKey: "AIzaSyAPLo8h7PEV81sSkFTYBOtss8j2XWBcyU8",
    authDomain: "movies-c103b.firebaseapp.com",
    databaseURL: "https://movies-c103b.firebaseio.com",
    projectId: "movies-c103b",
    storageBucket: "movies-c103b.appspot.com",
    messagingSenderId: "249993843043",
    appId: "1:249993843043:web:55e094ade1ec7f4a408356"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
