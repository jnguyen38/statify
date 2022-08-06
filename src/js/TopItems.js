import React, {useEffect, useState} from "react";
import {ArtistModal, SongModal} from "./Modal"
import ToggleSwitch from "./ToggleSwitch";

import gridView from "../media/grid_view_FILL0_wght300_GRAD0_opsz48.png";
import listView from "../media/view_list_FILL0_wght300_GRAD0_opsz48.png";

function Item(props) {
    const [clicked, setClicked] = useState(false)

    function handleShow() {
        props.showModal(props.index)
        setClicked(true)
    }

    function handleAnimationEnd() {
        setClicked(false)
    }

    function handleDisplay() {
        const itemImg = document.getElementsByClassName("no-transition")
        Array.prototype.filter.call(itemImg, e => e.classList.remove("no-transition"))
        Array.prototype.filter.call(itemImg, e => e.offsetHeight)
    }

    return (
        <section>
            <div index={props.index + 1}
                 title={(props.index + 1).toString() + " / " + props.item.name}
                 className={(props.itemType === "Songs") ? "song" : "artist"}
                 onMouseOver={handleDisplay}
                 onClick={handleShow}>
                <img className={(props.itemType === "Songs") ? "song-img" : "artist-img"}
                     src={props.item.image} alt=""/>
                {(props.itemType === "Songs" || props.display) ? (<h3>{props.item.name}</h3>) : null}
            </div>
            {(props.itemType === "Songs") ? (
                <SongModal track={props.item} index={props.index + 1}
                           right={props.right} left={props.left}
                           show={props.show} close={props.close}
                           clicked={clicked} functionAnimationEnd={handleAnimationEnd}
                           onAnimationEnd={handleAnimationEnd}
                           className={(clicked) ? "item-clicked" : ""}/>
                ) : (
                <ArtistModal artist={props.item} index={props.index + 1}
                             right={props.right} left={props.left}
                             show={props.show} close={props.close}
                             clicked={clicked} functionAnimationEnd={handleAnimationEnd}
                             onAnimationEnd={handleAnimationEnd} tracks={props.tracks}
                             className={(clicked) ? "item-clicked" : ""}/>
            )}
        </section>
    )
}

function TopItemsDisplay(props) {
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
        <section className={(props.display) ? "top-items-display list-view" : "top-items-display grid-view"}>
            {props.topItems.map((item, index) => (
                <Item item={item} index={index}
                      right={shiftRight} left={shiftLeft}
                      showModal={showModal} close={closeModal}
                      show={show[index]} itemType={props.itemType}
                      tracks={props.tracks}
                      key={item.id} display={props.display}/>
            ))}
        </section>
    )
}

function TopItemsOptions(props) {
    function setTimeRange(term) {
        props.setTimeRange(term)
    }

    return (
        <section className="top-items-options">
            <div className={(props.timeRange === "short_term") ? "top-items-range-selected" : "top-items-range"}
                 id="short_term"
                 onClick={() => {setTimeRange("short_term")}}>
                <h2> Last Month </h2>
            </div>
            <div className={(props.timeRange === "medium_term") ? "top-items-range-selected" : "top-items-range"}
                 id="medium_term"
                 onClick={() => {setTimeRange("medium_term")}}>
                <h2> Six Months </h2>
            </div>
            <div className={(props.timeRange === "long_term") ? "top-items-range-selected" : "top-items-range"}
                 id="long_term"
                 onClick={() => {setTimeRange("long_term")}}>
                <h2> All Time </h2>
            </div>
            <div className="top-items-display-toggle d-flex-cc" >
                <img src={gridView} alt=""/>
                <ToggleSwitch setDisplay={props.setDisplay} display={props.display}/>
                <img src={listView} alt=""/>
            </div>
        </section>
    )
}

export default function TopItems(props) {
    return (
        <section className="top-items-container">
            <h1>Your Top {props.itemType} from...</h1>
            <TopItemsOptions setTimeRange={props.setTimeRange}
                             timeRange={props.timeRange}
                             display={props.display}
                             setDisplay={props.handleDisplay}/>
            <TopItemsDisplay topItems={props.topItems}
                             display={props.display}
                             tracks={props.tracks}
                             itemType={props.itemType}/>
        </section>
    )
}