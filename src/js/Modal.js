import React, {useEffect} from "react";
import arrowRight from "../media/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.png"
import arrowLeft from "../media/arrow_back_ios_new_FILL0_wght400_GRAD0_opsz48.png"
import {Item} from "./TopItems";

function convertDate(numericDate) {
    const dateArray = numericDate.split("-")
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let year = dateArray[0], month = monthsArray[parseInt(dateArray[1]-1)], day = parseInt(dateArray[2])

    return <p>{month} {day}, {year}</p>
}

function convertDuration(duration) {
    let minutes = Math.floor(duration / 60000)
    let seconds = String(Math.floor((duration % 60000) / 1000)).padStart(2, '0')
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
    else if (title === "Classy Girls (B Version)" && artist === "The Lumineers")
        return (
            <p style={{marginTop: "auto", fontSize: "10px"}}>Maggie HATES this song. Loves the regular version (it's the background noise)</p>
        )
}

function SongModalInfo(props) {
    const root = document.querySelector(":root")
    const pop = props.track.popularity, dance = props.track.danceability, energy = props.track.energy, acous = props.track.acousticness, loud = props.track.loudness

    useEffect(() => {
        root.style.setProperty('--popularity-width', pop.toString() + '%')
        root.style.setProperty('--dance-width', (dance * 100).toString() + '%')
        root.style.setProperty('--energy-width', (energy * 100).toString() + '%')
        root.style.setProperty('--acoustic-width', (acous * 100).toString() + '%')
        root.style.setProperty('--loudness-width', (100 - ((-1 * loud) * (6))).toString() + '%')
    }, [acous, dance, energy, loud, pop, root.style])

    return (
        <div className="modal-info" >
            <h3>{props.track.name}</h3>
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
    )
}


export function SongModal(props) {
    if (!props.show) return

    function handleNav(dir) {
        if (dir === "left")
            props.left()
        else if (dir === "right")
            props.right()
    }

    return (
        <div id={props.track.name} className="modal d-flex-cc" onClick={props.close}>
            <div className="modal-left d-flex-cc no-select" onClick={e => {e.stopPropagation(); handleNav("left");}}><img src={arrowLeft} alt=""/></div>
            <div className={(props.clicked) ? "song-modal-main modal-main main-clicked" : "song-modal-main modal-main"} onAnimationEnd={props.functionAnimationEnd} onClick={e => e.stopPropagation()}>
                <div className="modal-content" index={props.index} style={{overflow: "hidden"}}>
                    <section className="modal-stats">
                        <a href={props.track.uri}>
                            <div className="modal-img"><img src={props.track.image} alt="" /></div>
                        </a>
                        <SongModalInfo track={props.track}/>
                    </section>
                </div>
                <button onClick={props.close} className="modal-close-btn">Close</button>
            </div>
            <div className="modal-right d-flex-cc no-select" onClick={e => {e.stopPropagation(); handleNav("right")}}><img src={arrowRight} alt=""/></div>
        </div>
    )
}

function ArtistModalInfo(props) {
    const root = document.querySelector(":root")
    const pop = props.artist.popularity

    useEffect(() => {
        root.style.setProperty('--popularity-width', pop.toString() + '%')
    }, [pop, root.style])

    function numberWithCommas(num) {
        return (typeof num === "string") ? num : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function findLikedSongs() {
        let likedSongs = props.tracks[props.artist.name]
        return (likedSongs) ? likedSongs.join(" \u2022 ") : "none"
    }

    return (
        <div className="modal-info">
            <h3>{props.artist.name}</h3>
            <div className="br"/>
            <div className="info-line"><h4>Followers: </h4><p>{numberWithCommas(props.artist.followers)}</p></div>
            <div className="info-line"><h4 style={{alignSelf: "flex-start"}}>Genre: </h4><p style={{textAlign: "left"}}>{props.artist.genres.join(", ")}</p></div>
            <div className="br"/>
            {!(findLikedSongs() === "none") ? (
                <section>
                    <div className="info-line"><h4 style={{alignSelf: "flex-start", textAlign: "left", minWidth: "100px"}}>Your Favorites:</h4><p style={{textAlign: "left"}}>{findLikedSongs()}</p></div>
                    <div className="br"/>
                </section>
                ) : null}
            <div className="info-line"><h4>Albums: </h4><p>{props.artist.albums.length}</p></div>
            <div className="info-line"><h4>Singles: </h4><p>{props.artist.singles.length}</p></div>
            <div className="info-line"><h4>Popularity: </h4><p>{props.artist.popularity}</p><h5>{props.artist.popularity}</h5><div id="popularity-bar" className="stat-bar"></div></div>
        </div>
    )
}

function ArtistDiscography(props) {
    return (
        <div className="modal-discography">
            <div className="top-songs-disco list-view top-items-display">
                <h3>Top Songs</h3>
                {props.artist.topTracks.map((track, index) => (
                    <Item item={track} index={index}
                          right={null} left={null}
                          showModal={null} close={null}
                          show={false} itemType="Songs"
                          tracks={props.tracks}
                          key={track.id} display={true}/>
                ))}
                <div className="br"/>
            </div>
            {!(props.artist.albums.length === 0) ? (
                <div className="albums-disco list-view top-items-display">
                    <h3>Albums</h3>
                    {props.artist.albums.map((album, index) => (
                        <Item item={album} index={index}
                              right={null} left={null}
                              showModal={null} close={null}
                              show={false} itemType="Songs"
                              tracks={props.tracks}
                              key={album.id} display={true}/>
                    ))}
                    <div className="br"/>
                </div>
            ) : null}
            {!(props.artist.singles.length === 0) ? (
                <div className="singles-disco list-view top-items-display">
                    <h3>Singles and EPs</h3>
                    {props.artist.singles.map((single, index) => (
                        <Item item={single} index={index}
                              right={null} left={null}
                              showModal={null} close={null}
                              show={false} itemType="Songs"
                              tracks={props.tracks}
                              key={single.id} display={true}/>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export function ArtistModal(props) {
    if (!props.show) return

    function handleNav(dir) {
        if (dir === "left")
            props.left()
        else if (dir === "right")
            props.right()
    }

    return (
        <div id={props.artist.name} className="modal d-flex-cc" onClick={props.close}>
            <div className="modal-left d-flex-cc no-select" onClick={e => {e.stopPropagation(); handleNav("left");}}><img src={arrowLeft} alt=""/></div>
            <div className={(props.clicked) ? "artist-modal-main modal-main main-clicked" : "artist-modal-main modal-main"} onAnimationEnd={props.functionAnimationEnd} onClick={e => e.stopPropagation()}>
                <div className="modal-content" index={props.index}>
                    <section className="modal-stats">
                        <a href={props.artist.uri}>
                            <div className="modal-img"><img src={props.artist.image} alt="" /></div>
                        </a>
                        <ArtistModalInfo artist={props.artist} tracks={props.tracks}/>
                        <div style={{width: "20px"}}/>
                    </section>
                    <ArtistDiscography artist={props.artist}/>
                </div>
                <button onClick={props.close} className="modal-close-btn">Close</button>
            </div>
            <div className="modal-right d-flex-cc no-select" onClick={e => {e.stopPropagation(); handleNav("right")}}><img src={arrowRight} alt=""/></div>
        </div>
    )
}