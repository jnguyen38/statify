import React from "react";
import {useEffect, useState} from "react";
import {SongModal} from "./Modal"

function Song(props) {
    const [show, setShow] = useState(false)

    return (
        <section>
            <div index={props.index + 1}
                 className="song"
                 onClick={() => setShow(!show)}>
                <img src={props.track.albumUrl} alt=""/>
                <h3>{props.track.title}</h3>
            </div>
            <SongModal track={props.track}
                       index={props.index + 1}
                       show={show}
                       close={() => setShow(false)}/>
        </section>
    )
}

function TopSongsDisplay(props) {
    return (
        <section className="top-songs-display">
            {props.topTracks.map((track, index) => (
                <Song track={track} index={index} key={track.title}/>
            ))}
        </section>
    )
}

function TopSongsOptions(props) {
    function setTimeRange(term) {
        props.setTimeRange(term)
        document.getElementsByClassName("top-songs-range-selected")[0].className = "top-songs-range"
        document.getElementById(term).className = "top-songs-range-selected"
    }

    return (
        <section className="top-songs-options">
            <div className="top-songs-range-selected"
                 id="short_term"
                 onClick={() => {setTimeRange("short_term")}}>
                <h2> Last Month </h2>
            </div>
            <div className="top-songs-range"
                 id="medium_term"
                 onClick={() => {setTimeRange("medium_term")}}>
                <h2> Six Months </h2>
            </div>
            <div className="top-songs-range"
                 id="long_term"
                 onClick={() => {setTimeRange("long_term")}}>
                <h2> All Time </h2>
            </div>
        </section>
    )
}

export default function TopSongs(props) {
    const [topTracks, setTopTracks] = useState([])
    const [timeRange, setTimeRange] = useState("short_term")
    const [topSongsLocal, setLocal] = useState({"short_term" : [], "medium_term" : [], "long_term" : []})


    useEffect(() => {
        const ranges = ["short_term", "medium_term", "long_term"]
        for (let range = 0; range < ranges.length; range++) {
            props.spotifyApi.getMyTopTracks({time_range: ranges[range], limit: 50})
                .then(data => {
                    console.log(data)
                    let tempLocal = topSongsLocal
                    let tracks = []
                    // eslint-disable-next-line array-callback-return
                    data.body.items.map(track => {
                        const largestAlbumImage = track.album.images.reduce(
                            (largest, image) => {
                                if (image.height > largest.height) return image
                                return largest
                            },
                            track.album.images[0]
                        )

                        tracks.push({
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

                    tempLocal[ranges[range]] = tracks
                    setLocal(tempLocal)
                    if (range === 0) setTopTracks(tracks)
                    console.log(tracks)
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
            <h1>Your Top Songs from...</h1>
            <TopSongsOptions setTimeRange={setTimeRange}/>
            <TopSongsDisplay topTracks={topTracks}/>
        </section>
    )
}