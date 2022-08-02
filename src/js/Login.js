import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";

const scope = [
        'user-read-private',
        'user-read-email',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-read-private',
        'playlist-modify-private',
        'user-top-read',
        'user-read-recently-played',
        'user-library-modify',
        'user-library-read'
    ],
    redirect_uri = ['http://localhost:3000/dashboard'],
    client_id = ['5c42b63580e74a5d98548a11638db40f'],
    response_type = ["code"];

const header = {
    client_id     : client_id,
    response_type : response_type,
    redirect_uri  : redirect_uri,
    scope        : scope
}

function buildURL (header) {
    let url = "https://accounts.spotify.com/authorize?"
    for (const [key, value] of Object.entries(header)) {
        url += key.toString() + '='
        for (let elem = 0; elem < value.length; elem++) {
            url += value[elem].toString()
            if (elem !== value.length - 1) {
                url += "%20"
            }
        }
        url += "&"
    }
    return url
}

export default function Login() {
    const AUTH_URL = buildURL(header)
    const navigate = useNavigate()
    const [cookies] = useCookies(['accessToken'])

    function redirectUser() {
        navigate('/dashboard')
    }

    function isLoggedIn() {
        return (cookies.accessToken)
    }

    useEffect(() => {
        if (isLoggedIn()) redirectUser()
    })

    return (
        <section className="login">
            <h2>Are you new?</h2>
            <p>Log in with spotify using the button below</p>
            <a href={AUTH_URL}>
                <button type="button" id="login-button">
                    Login
                </button>
            </a>
        </section>
    )
}