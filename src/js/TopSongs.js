import React, {useEffect, useState} from "react";
import {SongModal} from "./Modal"
import ToggleSwitch from "./ToggleSwitch";

import gridView from "../media/grid_view_FILL0_wght300_GRAD0_opsz48.png";
import listView from "../media/view_list_FILL0_wght300_GRAD0_opsz48.png";

function Song(props) {
    const [clicked, setClicked] = useState(false)

    function handleShow() {
        props.showModal(props.index)
        setClicked(true)
    }

    function handleAnimationEnd() {
        setClicked(false)
    }

    function handleDisplay() {
        const songImg = document.getElementsByClassName("song-img")
        Array.prototype.filter.call(songImg, e => e.classList.remove("no-transition"))
        Array.prototype.filter.call(songImg, e => e.offsetHeight)
    }

    return (
        <section>
            <div index={props.index + 1}
                 className="song"
                 onMouseOver={handleDisplay}
                 onClick={handleShow}>
                <img className="song-img" src={props.track.albumUrl} alt=""/>
                <h3>{props.track.title}</h3>
            </div>
            <SongModal track={props.track} index={props.index + 1}
                       right={props.right} left={props.left}
                       show={props.show} close={props.close}
                       clicked={clicked} functionAnimationEnd={handleAnimationEnd}
                       onAnimationEnd={handleAnimationEnd}
                       className={(clicked) ? "song-clicked" : ""}/>
        </section>
    )
}

function TopSongsDisplay(props) {
    const init = new Array(50).fill(false)
    const [show, setShow] = useState(init)
    const [reload, setReload] = useState(0)

    function shiftLeft() {
        let tempShow = show
        tempShow = tempShow.concat(tempShow.splice(0,1))
        setShow(tempShow)
    }

    function shiftRight() {
        let tempShow = show
        tempShow = tempShow.concat(tempShow.splice(0,49))
        setShow(tempShow)
    }

    function showModal(index) {
        let tempShow = init
        tempShow[index] = true
        setShow(tempShow)
    }

    function closeModal() {
        setShow(init)
        reload.toString()
    }

    useEffect(() => {
        setReload(Math.random())
    }, [show])

    return (
        <section className={(props.display) ? "top-songs-display list-view" : "top-songs-display grid-view"}>
            {props.topTracks.map((track, index) => (
                <Song track={track} index={index}
                      right={shiftRight} left={shiftLeft}
                      showModal={showModal} close={closeModal}
                      show={show[index]} key={track.title}/>
            ))}
        </section>
    )
}

function TopSongsOptions(props) {
    function setTimeRange(term) {
        props.setTimeRange(term)
    }

    return (
        <section className="top-songs-options">
            <div className={(props.timeRange === "short_term") ? "top-songs-range-selected" : "top-songs-range"}
                 id="short_term"
                 onClick={() => {setTimeRange("short_term")}}>
                <h2> Last Month </h2>
            </div>
            <div className={(props.timeRange === "medium_term") ? "top-songs-range-selected" : "top-songs-range"}
                 id="medium_term"
                 onClick={() => {setTimeRange("medium_term")}}>
                <h2> Six Months </h2>
            </div>
            <div className={(props.timeRange === "long_term") ? "top-songs-range-selected" : "top-songs-range"}
                 id="long_term"
                 onClick={() => {setTimeRange("long_term")}}>
                <h2> All Time </h2>
            </div>
            <div className="top-songs-display-toggle d-flex-cc" >
                <img src={gridView} alt=""/>
                <ToggleSwitch setDisplay={props.setDisplay} display={props.display}/>
                <img src={listView} alt=""/>
            </div>
        </section>
    )
}

export default function TopSongs(props) {
    return (
        <section className="top-songs-container">
            <h1>Your Top Songs from...</h1>
            <TopSongsOptions setTimeRange={props.setTimeRange}
                             timeRange={props.timeRange}
                             display={props.display}
                             setDisplay={props.handleDisplay}/>
            <TopSongsDisplay topTracks={props.topTracks} display={props.display}/>
        </section>
    )
}