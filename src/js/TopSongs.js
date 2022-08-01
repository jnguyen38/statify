import React from "react";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

import "../css/TopSongs.css"

export default function TopSongs(props) {
    const [topTracks, setTopTracks] = useState([])
    const [timeRange, setTimeRange] = useState("medium_term")
    const [cookies] = useCookies([]);

    useEffect(() => {
        if (!cookies.accessToken) return
        props.spotifyApi.setAccessToken(cookies.accessToken)
    }, [cookies.accessToken, props.spotifyApi])

    useEffect(() => {
        props.spotifyApi.getMyTopTracks({time_range: timeRange, limit: 50})
            .then(data => {
                let tracks = []
                // eslint-disable-next-line array-callback-return
                data.body.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )

                    tracks.push({
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    })
                })
                setTopTracks(tracks)
            }).catch(err => {
            console.log(err);
        });
    }, [timeRange, props.spotifyApi])

    return (
        <section className="top-songs-container">
            <h1>Your Top Songs</h1>
            <section className="top-songs-options">
                <div className="top-songs-range" onClick={() => {setTimeRange("short_term")}}>
                    <h2> Last Month </h2>
                </div>
                <div className="top-songs-range" onClick={() => {setTimeRange("medium_term")}}>
                    <h2> Six Months </h2>
                </div>
                <div className="top-songs-range" onClick={() => {setTimeRange("long_term")}}>
                    <h2> All Time </h2>
                </div>
            </section>
            <section className="top-songs-display">
                {topTracks.map((track, index) => {
                    return (
                        <div index={index + 1} key={track.title} className="song">
                            <img src={track.albumUrl} alt=""/>
                            <h3>{track.title}</h3>
                        </div>
                    )
                })}
            </section>
        </section>
    )
}