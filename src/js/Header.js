import React from "react";
import { Link } from 'react-router-dom';
import logo from "../media/statify-logo-green.png";
import {useCookies} from "react-cookie";


export default function SiteHeader() {
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies()
    const homeRedirect = (cookies.accessToken) ? "/dashboard" : "/";
    const songRedirect = (cookies.accessToken) ? "/dashboard/top-songs" : "/";
    const artistRedirect = (cookies.accessToken) ? "/dashboard/top-artists" : "/";


    function logout() {
        removeCookie("accessToken", {path: '/'})
    }

    return (
        <section className="header">
            <Link to={'/'} id="logo-link" className="d-flex-cc">
                <img id="logo" src={logo} alt="logo"/>
                <h1>Statify</h1>
            </Link>
            <nav>
                <div className="nav-box d-flex-cc">
                    <Link to={homeRedirect}><h2 className="nav-link">Home</h2></Link>
                </div>
                <div className="nav-box d-flex-cc">
                    <Link to={songRedirect}><h2 className="nav-link">Songs</h2></Link>
                </div>
                <div className="nav-box d-flex-cc">
                    <Link to={artistRedirect}><h2 className="nav-link">Artists</h2></Link>
                </div>
                <div className="nav-box d-flex-cc" onClick={logout}>
                    <Link to={'/'}><h2 className="nav-link">Logout</h2></Link>
                </div>
            </nav>
        </section>
    )
}

