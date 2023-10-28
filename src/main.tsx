import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './loading';
import './main.css';
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const LazyApp = lazy(() => import('./app'));

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
