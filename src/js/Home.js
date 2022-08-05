import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom"

import Login from "./Login";
import Dashboard from "./Dashboard";
import SpotifyWebApi from "spotify-web-api-node";
import {useCookies} from "react-cookie";
import TopItems from "./TopItems";

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
    const [topSongsDisplay, setTopSongsDisplay] = useState(false)

    const [topArtistsLocal, setTopArtistsLocal] = useState({"short_term" : [], "medium_term" : [], "long_term" : []})
    const [topArtists, setTopArtists] = useState([])
    const [topArtistsTimeRange, setTopArtistsTimeRange] = useState("short_term")
    const [topArtistsDisplay, setTopArtistsDisplay] = useState(false)

    const [cookies] = useCookies()

    function handleTopSongsDisplay(setting) {
        setTopSongsDisplay(setting)
    }

    function handleTopArtistsDisplay(setting) {
        setTopArtistsDisplay(setting)
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

    // Local Caching of Top Artists and Songs to prevent unnecessary API calls
    useEffect(() => {
        if (!cookies.accessToken) return
        const ranges = ["short_term", "medium_term", "long_term"]
        for (const range of ranges) {
            spotifyApi.getMyTopArtists({time_range: range, limit: 50}).then(data => {
                return data.body.items.map(artist => {
                    const largestArtistImg = largestImgOf(artist.images)
                    return ({
                        followers: artist.followers.total,
                        name: artist.name,
                        popularity: artist.popularity,
                        uri: artist.uri,
                        image: largestArtistImg.url,
                        imgHeight: largestArtistImg.height,
                        imgWidth: largestArtistImg.width,
                        genres: artist.genres,
                        id: artist.id
                    })
                })
            }).then(artists => {
                return artists.map(artist => {
                    let tempObj = {}
                    spotifyApi.getArtistTopTracks(artist.id, "US").then(data => {
                        const tracks = {tracks: data.body.tracks}
                        Object.assign(tempObj, artist, tracks)
                    }).catch(err => {
                        console.log(err)
                    })
                    spotifyApi.getArtistAlbums(artist.id, {limit: 50}).then(data => {
                        const discography = data.body.items.map(item => {
                            const largestImg = largestImgOf(item.images)
                            return ({
                                type: item.album_group,
                                id: item.id,
                                uri: item.uri,
                                totalTracks: item.total_tracks,
                                release: item.release_date,
                                name: item.name,
                                image: largestImg.url
                            })
                        })
                        const releases = {
                            albums: discography.filter(item => {return (item.type === "album")}),
                            singles: discography.filter(item => {return (item.type === "single")})}
                        Object.assign(tempObj, releases, tempObj)
                    })
                    return tempObj
                })
            }).then(data => {
                let tempLocal = topArtistsLocal
                tempLocal[range] = data
                setTopArtistsLocal(tempLocal)
                if (range === "short_term") setTopArtists(data)
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
                        name: track.name,
                        uri: track.uri,
                        image: largestAlbumImage.url,
                        popularity: track.popularity,
                        duration: track.duration_ms,
                        release: track.album.release_date,
                        albumName: track.album.name,
                        id: track.id,
                    })
                })
            }).then(tracks => {
                return spotifyApi.getAudioFeaturesForTracks(tracks.map(track => {return track.id})).then(data => {
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
                    <Route path={'/dashboard/top-songs'} element={<TopItems setTimeRange={setTopSongsTimeRange}
                                                                            timeRange={topSongsTimeRange}
                                                                            itemType="Songs"
                                                                            topItems={topTracks}
                                                                            handleDisplay={handleTopSongsDisplay}
                                                                            display={topSongsDisplay}/>}/>
                    <Route path={'/dashboard/top-artists'} element={<TopItems setTimeRange={setTopArtistsTimeRange}
                                                                              timeRange={topArtistsTimeRange}
                                                                              itemType="Artists"
                                                                              topItems={topArtists}
                                                                              handleDisplay={handleTopArtistsDisplay}
                                                                              display={topArtistsDisplay}/>}/>
                </Routes>
            </main>
        </div>
    )
}

