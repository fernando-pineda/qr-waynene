import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBVT4cXB_7UAVcaEz0BG5rgobVtYJJwYTA",
  authDomain: "waynene-e4044.firebaseapp.com",
  databaseURL: "https://waynene-e4044.firebaseio.com/",
  projectId: "waynene-e4044",
  storageBucket: "gs://waynene-e4044.appspot.com/",
  messagingSenderId: "311570164482",
  appId: "1:311570164482:android:68abf43ad244b891f1f01b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
