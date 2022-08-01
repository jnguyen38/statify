import {useCookies} from "react-cookie";
import useAuth from "./useAuth";
import React, {useEffect} from "react";
import TopSongs from "./TopSongs";
import SpotifyWebApi from "spotify-web-api-node";
import {Link} from "react-router-dom";

const redirect_uri = ['http://localhost:3000/dashboard'],
    client_id = ['5c42b63580e74a5d98548a11638db40f'],
    client_secret = ['f7e812c4d6e14139b4b13c4f270b56d4']

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
})

export default function Dashboard() {
    const [cookies, setCookie] = useCookies(["accessToken", "spotifyApi"]);
    const code = new URLSearchParams(window.location.search).get('code')
    const token = useAuth(code)


    useEffect(() => {
        if (!token) return
        setCookie('accessToken', token, {path: '/'})
    }, [setCookie, token])

    useEffect(() => {
        if (!cookies.accessToken) return
        spotifyApi.setAccessToken(cookies.accessToken)
    }, [cookies.accessToken])

    // if (spotifyApi) setCookie('spotifyApi', spotifyApi, {path: '/'})

    return (
        <section>
            <h1>Dashboard</h1>
            <div className="dashboard-container">
                <Link to={'/top-songs'}>
                    <div className="dashboard-banner">
                        <h2>Top Songs</h2>
                    </div>
                </Link>
                <div className="dashboard-banner">
                    <h2>Top Artists</h2>
                </div>
                <div className="dashboard-banner">
                    <h2>Top Genres</h2>
                </div>
                <div className="dashboard-banner">
                    <h2>Playlist Creator</h2>
                </div>
            </div>
        </section>
    )

    // return (
    //     <TopSongs/>
    // )
}