import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthContextProvider } from './context/AuthContext'
import './assets/scss/base.scss'

const value = "false"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
       <App /> 
    </AuthContextProvider>)
