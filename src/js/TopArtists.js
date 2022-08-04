import React, {useEffect, useState} from "react";
import {SongModal} from "./Modal"
import ToggleSwitch from "./ToggleSwitch";

import gridView from "../media/grid_view_FILL0_wght300_GRAD0_opsz48.png";
import listView from "../media/view_list_FILL0_wght300_GRAD0_opsz48.png";

function Artist(props) {
    const [clicked, setClicked] = useState(false)

    function handleShow() {
        props.showModal(props.index)
        setClicked(true)
    }

    function handleAnimationEnd() {
        setClicked(false)
    }

    function handleDisplay() {
        const artistImg = document.getElementsByClassName("artist-img")
        Array.prototype.filter.call(artistImg, e => e.classList.remove("no-transition"))
        Array.prototype.filter.call(artistImg, e => e.offsetHeight)
    }

    return (
        <section>
            <div index={props.index + 1}
                 className="artist"
                 onMouseOver={handleDisplay}
                 onClick={handleShow}>
                <img className="artist-img" src={props.artist.image} alt=""/>
                <h3>{props.artist.name}</h3>
            </div>
            <SongModal track={props.artist} index={props.index + 1}
                       right={props.right} left={props.left}
                       show={props.show} close={props.close}
                       clicked={clicked} functionAnimationEnd={handleAnimationEnd}
                       onAnimationEnd={handleAnimationEnd}
                       className={(clicked) ? "artist-clicked" : ""}/>
        </section>
    )
}

function TopArtistsDisplay(props) {
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
        <section className={(props.display) ? "top-artists-display list-view" : "top-artists-display grid-view"}>
            {props.topArtists.map((artist, index) => (
                <Artist artist={artist} index={index}
                        right={shiftRight} left={shiftLeft}
                        showModal={showModal} close={closeModal}
                        show={show[index]} key={Math.random()}/>
            ))}
        </section>
    )
}

function TopArtistsOptions(props) {
    function setTimeRange(term) {
        props.setTimeRange(term)
    }

    return (
        <section className="top-artists-options">
            <div className={(props.timeRange === "short_term") ? "top-artists-range-selected" : "top-artists-range"}
                 id="short_term"
                 onClick={() => {setTimeRange("short_term")}}>
                <h2> Last Month </h2>
            </div>
            <div className={(props.timeRange === "medium_term") ? "top-artists-range-selected" : "top-artists-range"}
                 id="medium_term"
                 onClick={() => {setTimeRange("medium_term")}}>
                <h2> Six Months </h2>
            </div>
            <div className={(props.timeRange === "long_term") ? "top-artists-range-selected" : "top-artists-range"}
                 id="long_term"
                 onClick={() => {setTimeRange("long_term")}}>
                <h2> All Time </h2>
            </div>
            <div className="top-artists-display-toggle d-flex-cc" >
                <img src={gridView} alt=""/>
                <ToggleSwitch setDisplay={props.setDisplay} display={props.display}/>
                <img src={listView} alt=""/>
            </div>
        </section>
    )
}

export default function TopArtists(props) {
    return (
        <section className="top-artists-container">
            <h1>Your Top Artists from...</h1>
            <TopArtistsOptions setTimeRange={props.setTimeRange}
                             timeRange={props.timeRange}
                             display={props.display}
                             setDisplay={props.handleDisplay}/>
            <TopArtistsDisplay topArtists={props.topArtists} display={props.display}/>
        </section>
    )
}