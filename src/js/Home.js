import React from "react";
import {Routes, Route} from "react-router-dom"

import '../css/Home.css';
import Login from "./Login";
import Dashboard from "./Dashboard";
import TopSongs from "./TopSongs";
import SpotifyWebApi from "spotify-web-api-node";
import {useEffect} from "react";
import {useCookies} from "react-cookie";

const redirect_uri = ['http://localhost:3000/dashboard'],
    client_id = ['5c42b63580e74a5d98548a11638db40f'],
    client_secret = ['f7e812c4d6e14139b4b13c4f270b56d4']

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
})

export default function Home() {
    const [cookies] = useCookies()
    
    useEffect(() => {
        if (!cookies.accessToken) return
        spotifyApi.setAccessToken(cookies.accessToken)
    }, [cookies.accessToken])
    
    return (
        <div className="Home">
            <main className="Home-header">
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    <Route path={'/dashboard'} element={<Dashboard spotifyApi={spotifyApi}/>}/>
                    <Route path={'/dashboard/top-songs'} element={<TopSongs spotifyApi={spotifyApi}/>}/>
                </Routes>
            </main>
        </div>
    )
}

