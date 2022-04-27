import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { FirebaseAppProvider } from 'reactfire';
import ProviderLayer from './ProviderLayer';


// import { getAnalytics } from "firebase/analytics"; -- ads and stuff

// TODO: Add SDKs for Firebase products that you want to use
// ADDING REALTIME DATABASE & AUTHENTICATION

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAl6lxfnThLP51_Tyt03GqWocgTA5DKAwk",

  authDomain: "vanguard-andrew-final.firebaseapp.com",

  projectId: "vanguard-andrew-final",

  storageBucket: "vanguard-andrew-final.appspot.com",

  messagingSenderId: "354551353238",

  appId: "1:354551353238:web:9cd9e25bb2344a1b7697b7",

  measurementId: "G-G5Z0KW7J63",

  databaseURL: "https://vanguard-andrew-final-default-rtdb.firebaseio.com/"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);


ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <ProviderLayer />
        </FirebaseAppProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
