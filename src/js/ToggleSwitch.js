import React, {useState} from "react";

export default function ToggleSwitch(props){
    const [on, setOn] = useState(!(props.display))

    function handleDisplay() {
        const songImg = document.getElementsByClassName("item-img")
        Array.prototype.filter.call(songImg, e => e.classList.add("no-transition"))
        setOn(!on)
        props.setDisplay(on)
        Array.prototype.filter.call(songImg, e => e.offsetHeight)
    }

    return (
        <label className="toggle-switch" >
            <input name="top-display" type="checkbox" onClick={handleDisplay} checked={!(on)} onChange={Math.random}/>
            <div className="slider"></div>
        </label>
    )
}