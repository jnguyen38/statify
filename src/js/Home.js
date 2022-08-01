import React from "react";
import {Routes, Route} from "react-router-dom"

import '../css/Home.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import TopSongs from "./TopSongs";

export default function Home() {
    return (
        <div className="Home">
            <main className="Home-header">
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/top-songs'} element={<TopSongs/>}/>
                </Routes>
            </main>
        </div>
    )
}

