import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './views/Home/Home';
import {createBrowserRouter, RouterProvider} from  'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    
    {
        path: '/login',
        element:  <GoogleOAuthProvider clientId="372862298908-b2hj1tkd62es5us538qs9r1qekh8auc8.apps.googleusercontent.com"> 
        <Home />
        </GoogleOAuthProvider>
    },
    {
        path: '/',
        element: <App/>
    }
]);

root.render( <RouterProvider router={router} /> );