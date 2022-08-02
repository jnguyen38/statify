import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import reportWebVitals from './js/reportWebVitals';
import SiteHeader from './js/Header';
import Home from "./js/Home";
import Info from "./js/Info";
import './css/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <BrowserRouter>
            <React.StrictMode>
                <SiteHeader/>
                <Routes>
                    <Route path="/*" element={<Home/>}/>
                    <Route path="/info" element={<Info/>}/>
                </Routes>
            </React.StrictMode>
        </BrowserRouter>
    </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
