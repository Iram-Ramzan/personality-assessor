import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="373348783271-f5camdkmjadb1r87l6lg7je2spm2ggts.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
);
reportWebVitals();
