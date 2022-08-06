import React, {useState} from "react";

export default function ToggleSwitch(props){
    const [on, setOn] = useState(!(props.display))

    function handleDisplay() {
        const song = document.getElementsByClassName("song")
        const songImg = document.getElementsByClassName("song-img")
        const artist = document.getElementsByClassName("artist")
        const artistImg = document.getElementsByClassName("artist-img")
        Array.prototype.filter.call(songImg, e => e.classList.add("no-transition"))
        Array.prototype.filter.call(artistImg, e => e.classList.add("no-transition"))
        Array.prototype.filter.call(song, e => e.classList.add("no-transition"))
        Array.prototype.filter.call(artist, e => e.classList.add("no-transition"))
        setOn(!on)
        props.setDisplay(on)
        Array.prototype.filter.call(songImg, e => e.offsetHeight)
        Array.prototype.filter.call(artistImg, e => e.offsetHeight)
        Array.prototype.filter.call(song, e => e.offsetHeight)
        Array.prototype.filter.call(artist, e => e.offsetHeight)
    }

    return (
        <label className="toggle-switch" >
            <input name="top-display" type="checkbox" onClick={handleDisplay} checked={(props.display)} onChange={Math.random}/>
            <div className="slider"></div>
        </label>
    )
}