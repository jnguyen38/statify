import React from "react";
import { Routes, Route} from "react-router-dom";

import Home from './Home';
import Info from './Info';

export default function NavigationStack() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
    )
}