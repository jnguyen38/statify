import React, {useState} from "react";

export default function ToggleSwitch(props){
    const [on, setOn] = useState(false)

    function handleClick() {
        setOn(!on)
        console.log(on)
    }

    return (
        <label className="toggle-switch" onClick={handleClick}>
            <input name="top-display" type="checkbox"/>
            <div className="slider"></div>
        </label>
    )
}