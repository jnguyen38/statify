import React, {useEffect} from "react";

function convertDate(numericDate) {
    const dateArray = numericDate.split("-")
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let year = dateArray[0], month = monthsArray[parseInt(dateArray[1]-1)], day = parseInt(dateArray[2])

    return <p>{month} {day}, {year}</p>
}

function convertDuration(duration) {
    let minutes = Math.floor(duration / 60000)
    let seconds = String(Math.round((duration % 60000) / 1000)).padStart(2, '0')
    return <p>{minutes}:{seconds}</p>
}

function maggie(title, artist) {
    if (title === "The Gambler" && artist === "fun.")
        return (
            <p style={{marginTop: "auto", fontSize: "10px"}}>Extremely Important Note: This is Maggie's favorite song</p>
        )
    else if (title === "Carlo's Song" && artist === "Noah Kahan")
        return (
            <p style={{marginTop: "auto", fontSize: "10px"}}>Other Extremely Important Note: This is Maggie's favorite Noah Kahan song</p>
        )
}

export function SongModal(props) {
    const root = document.querySelector(":root")
    const pop = props.track.popularity, dance = props.track.danceability, energy = props.track.energy, acous = props.track.acousticness, loud = props.track.loudness
    if (!props.show) return

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        root.style.setProperty('--popularity-width', pop.toString() + '%')
        root.style.setProperty('--dance-width', (dance * 100).toString() + '%')
        root.style.setProperty('--energy-width', (energy * 100).toString() + '%')
        root.style.setProperty('--acoustic-width', (acous * 100).toString() + '%')
        root.style.setProperty('--loudness-width', (100 - ((-1 * loud) * (6))).toString() + '%')
    }, [acous, dance, energy, loud, pop, root.style])

    return (
        <div id={props.track.title} className="song-modal" onClick={props.close}>
            <div className="song-modal-main" onClick={e => e.stopPropagation()}>
                <div className="song-modal-content" index={props.index}>
                    <img src={props.track.albumUrl} alt="" className="song-modal-img"/>
                    <div className="song-modal-info" >
                        <h3>{props.track.title}</h3>
                        <div className="info-line"><p>{props.track.artist}</p></div>
                        <div className='br'/>
                        <div className="info-line"><h4>Album: </h4><p> {props.track.albumName}</p></div>
                        <div className="info-line"><h4>Release Date: </h4>{convertDate(props.track.release)}</div>
                        <div className="info-line"><h4>Duration: </h4>{convertDuration(props.track.duration)}</div>
                        <div className='br'/>
                        <div className="info-line"><h4>Popularity: </h4><h5>{pop}</h5><div id="popularity-bar" className="stat-bar"></div></div>
                        <div className="info-line"><h4>Acousticness: </h4><h5>{acous}</h5><div id="acoustic-bar" className="stat-bar"></div></div>
                        <div className="info-line"><h4>Danceability: </h4><h5>{dance}</h5><div id="dance-bar" className="stat-bar"></div></div>
                        <div className="info-line"><h4>Energy: </h4><h5>{energy}</h5><div id="energy-bar" className="stat-bar"></div></div>
                        <div className="info-line"><h4>Loudness: </h4><h5>{loud + " db"}</h5><div id="loudness-bar" className="stat-bar"></div></div>

                        {maggie(props.track.title, props.track.artist)}
                    </div>
                </div>
                <button onClick={props.close} className="modal-close-btn">Close</button>
            </div>
        </div>
    )
}