import React from "react";
import { Link } from 'react-router-dom';
import logo from "../media/statify-logo-green.png";
import {useCookies} from "react-cookie";


export default function SiteHeader() {
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies()
    let redirect = (cookies.accessToken) ? "/dashboard" : "/";

    function logout() {
        removeCookie("accessToken", {path: '/'})
    }

    return (
        <section className="header">
            <Link to={'/'} id="logo-link">
                <img id="logo" src={logo} alt="logo"/>
                <h1>Statify</h1>
            </Link>
            <nav>
                <div className="nav-box">
                    <Link to={'/Info'}><h2 className="nav-link">About</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={redirect}><h2 className="nav-link">Home</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={'/'}><h2 className="nav-link">Explore</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={'/'}><h2 className="nav-link">Contact</h2></Link>
                </div>
                <div className="nav-box" onClick={logout}>
                    <Link to={'/'}><h2 className="nav-link">Logout</h2></Link>
                </div>
            </nav>
        </section>
    )
}

