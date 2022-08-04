import React, {useState} from "react";

export default function ToggleSwitch(props){
    const [on, setOn] = useState(true)

    function handleDisplay() {
        const songImg = document.getElementsByClassName("song-img")
        Array.prototype.filter.call(songImg, e => e.classList.add("no-transition"))
        setOn(!on)
        props.setDisplay(on)
        Array.prototype.filter.call(songImg, e => e.offsetHeight)
    }

    return (
        <label className="toggle-switch" onClick={handleDisplay}>
            <input name="top-display" type="checkbox" onClick={e => e.stopPropagation()}/>
            <div className="slider"></div>
        </label>
    )
}