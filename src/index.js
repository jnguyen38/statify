import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import './css/Index.css';
import reportWebVitals from './js/reportWebVitals';
import NavigationStack from './js/Routes';
import SiteHeader from './js/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <BrowserRouter>
            <React.StrictMode>
                <SiteHeader/>
                <NavigationStack/>
            </React.StrictMode>
        </BrowserRouter>
    </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
