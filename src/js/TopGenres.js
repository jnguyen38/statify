import React from "react";

export default function TopGenres(props) {
    console.log(props.genres)

    const sortedGenres = Object.entries(props.genres).sort(([,a],[,b]) => b-a)

    console.log(sortedGenres);

    return (
        <section className="genres-container">
            <h1>Your Top Genres from...</h1>

        </section>
    )
}