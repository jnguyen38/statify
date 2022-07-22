import React from "react";
import { Routes, Route} from "react-router-dom";

import App from './App';
import Info from './Info';

export default function NavigationStack() {
    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
    )
}