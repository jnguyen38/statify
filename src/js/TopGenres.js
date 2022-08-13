import React, {useEffect} from "react";
import {TopItemsOptions} from "./TopItems";

function Genre(props) {
    const width = ((props.genre[1] / props.max) * 100).toString() + "%";
    console.log(width)

    useEffect(() => {
    })

    return (
        <div className="genre">
            <h2>{props.index + 1} / {props.genre[0]}</h2>
            <div className="genre-stat-bar"></div>
        </div>
    )
}


function TopGenresDisplay(props) {

    return (
        <div className="top-genres-display">
            {props.genres.map((genre, index) => (
                <Genre genre={genre} index={index}
                       max={props.genres[0][1]}
                       key={genre[0]} display={props.display}/>
            ))}
        </div>
    )
}

export default function TopGenres(props) {
    return (
        <section className="top-items-container">
            <h1>Your Top Genres from...</h1>
            <TopItemsOptions setTimeRange={props.setTimeRange}
                             timeRange={props.timeRange}/>
            <TopGenresDisplay genres={props.genres}/>
        </section>
    )
}