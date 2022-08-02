import {useCookies} from "react-cookie";
import useAuth from "./useAuth";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Dashboard() {
    const [cookies, setCookie] = useCookies(["accessToken", "spotifyApi"]);
    const code = new URLSearchParams(window.location.search).get('code')
    const token = useAuth(code)
    const navigate = useNavigate()

    function redirectUser() {
        navigate("/")
    }

    useEffect(() => {
        if (!code && !cookies.accessToken) redirectUser()
    })

    useEffect(() => {
        if (!token) return
        setCookie('accessToken', token, {path: '/'})
    }, [setCookie, token])

    return (
        <section>
            <h1>Dashboard</h1>
            <div className="dashboard-container">
                <Link to={'./top-songs'}>
                    <div className="dashboard-banner"><h2>Top Songs</h2></div>
                </Link>
                <div className="dashboard-banner"><h2>Top Artists</h2></div>
                <div className="dashboard-banner"><h2>Top Genres</h2></div>
                <div className="dashboard-banner"><h2>Playlist Creator</h2></div>
            </div>
        </section>
    )
}