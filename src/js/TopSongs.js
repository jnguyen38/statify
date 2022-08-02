import React from "react";
import {useEffect, useState} from "react";

import "../css/TopSongs.css"

function TopSongsDisplay(props) {
    return (
        <section className="top-songs-display">
            {props.topTracks.map((track, index) => {
                return (
                    <div index={index + 1} key={track.title} className="song">
                        <img src={track.albumUrl} alt=""/>
                        <h3>{track.title}</h3>
                    </div>
                )
            })}
        </section>
    )
}

function TopSongsOptions(props) {
    return (
        <section className="top-songs-options">
            <div className="top-songs-range" onClick={() => {props.setTimeRange("short_term")}}>
                <h2> Last Month </h2>
            </div>
            <div className="top-songs-range" onClick={() => {props.setTimeRange("medium_term")}}>
                <h2> Six Months </h2>
            </div>
            <div className="top-songs-range" onClick={() => {props.setTimeRange("long_term")}}>
                <h2> All Time </h2>
            </div>
        </section>
    )
}

export default function TopSongs(props) {
    const [topTracks, setTopTracks] = useState([])
    const [timeRange, setTimeRange] = useState("medium_term")
    const [topSongsLocal, setLocal] = useState({"short_term" : [], "medium_term" : [], "long_term" : []})

    useEffect(() => {
        const ranges = ["short_term", "medium_term", "long_term"]
        for (let range = 0; range < ranges.length; range++) {
            props.spotifyApi.getMyTopTracks({time_range: ranges[range], limit: 50})
                .then(data => {
                    let tempLocal = topSongsLocal
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
                    tempLocal[ranges[range]] = tracks
                    setLocal(tempLocal)
                    if (range === 0) setTopTracks(tracks)
                }).catch(err => {
                console.log(err);
            });
        }
    }, [props.spotifyApi, topSongsLocal])

    useEffect(() => {
        setTopTracks(topSongsLocal[timeRange])
    }, [timeRange, props.spotifyApi, topSongsLocal])

    return (
        <section className="top-songs-container">
            <h1>Your Top Songs</h1>
            <TopSongsOptions setTimeRange={setTimeRange}/>
            <TopSongsDisplay topTracks={topTracks}/>
        </section>
    )
}