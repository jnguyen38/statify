import React, {useState} from "react";

export default function ToggleSwitch(props){
    const [on, setOn] = useState(true)

    function handleDisplay() {
        const divs = document.getElementsByClassName("song-img")
        Array.prototype.filter.call(divs, e => e.classList.add("no-transition"))
        setOn(!on)
        props.setDisplay(on)
        Array.prototype.filter.call(divs, e => e.offsetHeight)
        // Array.prototype.filter.call(divs, e => e.classList.remove("no-transition"))
    }

    return (
        <label className="toggle-switch" onClick={handleDisplay}>
            <input name="top-display" type="checkbox" onClick={e => e.stopPropagation()}/>
            <div className="slider"></div>
        </label>
    )
}