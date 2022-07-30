import React, {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import "../css/UserEndpoint.css"

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
    redirect_uri = ['http://localhost:3000'],
    client_id = ['5c42b63580e74a5d98548a11638db40f'],
    client_secret = ['f7e812c4d6e14139b4b13c4f270b56d4'],
    response_type = ["code"];

const header = {
    client_id     : client_id,
    response_type : response_type,
    redirect_uri  : redirect_uri,
    scope        : scope
}

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
})

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

function Login(props) {
    return (
        <section className="login">
            <h2>Are you new?</h2>
            <p>Log in with spotify using the button below</p>
            <a href={props.auth}>
                <button type="button" id="login-button">
                    Login
                </button>
            </a>
        </section>
    )
}

function Dashboard(props) {
    const accessToken = useAuth(props.code)
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMyTopTracks()
            .then(data => {
                console.log(data)
                setTopTracks(
                    data.body.items.map(track => {
                        const smallestAlbumImage = track.album.images.reduce(
                            (smallest, image) => {
                                if (image.height < smallest.height) return image
                                return smallest
                            },
                            track.album.images[0]
                        )

                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: smallestAlbumImage.url,
                        }
                    })
                )
            }).catch(err => {
                console.log(err);
        });
    }, [accessToken])

    console.log(topTracks);

    return (
        <section className="dashboard-container">
            <h1>My Dashboard</h1>
            <section className="top-songs">
                {topTracks.map(track => (
                    <div key={track.title} className="song">
                        <img src={track.albumUrl} alt=""/>
                        <h3>{track.title}</h3>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default function UserEndpoint(props) {
    const AUTH_URL = buildURL(header)
    return props.code ? <Dashboard code={props.code}/> : <Login auth={AUTH_URL}/>
}