
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDs2LJXTOeRWmqbtC4o8hFx9xF7O0rzvzE",
  authDomain: "movealert-4f529.firebaseapp.com",
  projectId: "movealert-4f529",
  storageBucket: "movealert-4f529.appspot.com",
  messagingSenderId: "124723694457",
  appId: "1:124723694457:web:11f9ef4dd73183431dfda8",
  measurementId: "G-TWE4JRVJ0G"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };