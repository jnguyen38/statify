import React from "react";
import {Routes, Route} from "react-router-dom"

import Login from "./Login";
import Dashboard from "./Dashboard";
import TopSongs from "./TopSongs";
import SpotifyWebApi from "spotify-web-api-node";
import {useEffect, useState} from "react";
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
    const [topSongsLocal, setTopSongsLocal] = useState({"short_term" : [], "medium_term" : [], "long_term" : []})
    const [topTracks, setTopTracks] = useState([])
    const [topSongsTimeRange, setTopSongsTimeRange] = useState("short_term")
    const [topArtistsLocal, setTopArtistsLocal] = useState({"short_term" : [], "medium_term" : [], "long_term" : []})
    const [topArtists, setTopArtists] = useState([])
    const [topArtistsTimeRange, setTopArtistsTimeRange] = useState("short_term")
    const [display, setDisplay] = useState(false)
    const [cookies] = useCookies()

    function handleDisplay(setting) {
        setDisplay(setting)
    }

    function largestImgOf(array) {
        return array.reduce((first, second) => {
            if (first.height > second.height) return first
            return second
        }, array[0])
    }
    
    useEffect(() => {
        if (!cookies.accessToken) return
        spotifyApi.setAccessToken(cookies.accessToken)
    }, [cookies.accessToken])

    useEffect(() => {
        if (!cookies.accessToken) return
        const ranges = ["short_term", "medium_term", "long_term"]
        for (const range of ranges) {
            spotifyApi.getMyTopArtists({time_range: range, limit: 50}).then(data => {
                console.log(range)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [topArtistsLocal, cookies.accessToken])
    
    useEffect(() => {
        setTopArtists(topArtistsLocal[topArtistsTimeRange])  
    }, [topArtistsLocal, topArtistsTimeRange])

    useEffect(() => {
        if (!cookies.accessToken) return
        const ranges = ["short_term", "medium_term", "long_term"]
        for (const range of ranges) {
            spotifyApi.getMyTopTracks({time_range: range, limit: 50}).then(data => {
                return data.body.items.map(track => {
                    const largestAlbumImage = largestImgOf(track.album.images)
                    return ({
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: largestAlbumImage.url,
                        popularity: track.popularity,
                        duration: track.duration_ms,
                        release: track.album.release_date,
                        albumName: track.album.name,
                        id: track.id,
                    })
                })
            }).then(tracks => {
                return spotifyApi.getAudioFeaturesForTracks(tracks.map(track => {return track.id}))
                .then(data => {
                    let features = data.body.audio_features
                    return tracks.map((song, index) => Object.assign({}, song, features[index]))
                }).catch(err => {
                    console.log(err)
                })
            }).then(data => {
                let tempLocal = topSongsLocal
                tempLocal[range] = data
                setTopSongsLocal(tempLocal)
                if (range === "short_term") setTopTracks(data)
            }).catch(err => {
                console.log(err);
            });
        }
    }, [topSongsLocal, cookies.accessToken])

    useEffect(() => {
        setTopTracks(topSongsLocal[topSongsTimeRange])
    }, [topSongsLocal, topSongsTimeRange])
    
    return (
        <div className="Home ">
            <main className="Home-header">
                <Routes>
                    <Route path={'/'} element={<Login/>}/>
                    <Route path={'/dashboard'} element={<Dashboard spotifyApi={spotifyApi}/>}/>
                    <Route path={'/dashboard/top-songs'} element={<TopSongs setTimeRange={setTopSongsTimeRange}
                                                                            timeRange={topSongsTimeRange}
                                                                            topTracks={topTracks}
                                                                            handleDisplay={handleDisplay}
                                                                            display={display}/>}/>
                    <Route path={'/dashboard/top-artists'} element={<TopSongs spotifyApi={spotifyApi}/>}/>
                </Routes>
            </main>
        </div>
    )
}

