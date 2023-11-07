import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './components/Loading';
import './main.css';
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LazyApp = lazy(() => import('./components/App'));

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0NtwCOWIqsxypbDnGAV9SanNsQkTZEcY',
  authDomain: 'monopoly-deal-sky.firebaseapp.com',
  projectId: 'monopoly-deal-sky',
  storageBucket: 'monopoly-deal-sky.appspot.com',
  messagingSenderId: '704612035652',
  appId: '1:704612035652:web:20a5b36654786847c12011',
  measurementId: 'G-NTX6SGD5N6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(errorCode, errorMessage, email, credential);
  });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
