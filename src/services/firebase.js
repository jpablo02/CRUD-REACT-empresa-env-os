// src/services/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Otras importaciones de módulos de firebase que necesites

// Configuración de la base de datos de Firebase y otras operaciones necesarias

const firebaseConfig = {
  apiKey: 'AIzaSyDpWFBG4QN8buLxAHIsglCKuMl7T6L-qAc',
  authDomain: 'taller-final-web-2.firebaseapp.com',
  projectId: 'taller-final-web-2',
  storageBucket: 'taller-final-web-2.appspot.com',
  messagingSenderId: '478824065429',
  appId: '1:478824065429:web:fc0ee280499af26bcbae9c',
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
