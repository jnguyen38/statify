import React from "react";
import '../css/Header.css';

import { Link } from 'react-router-dom';
import logo from "../media/statify-logo-green.png";


export default function SiteHeader() {
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
                    <Link to={'/'}><h2 className="nav-link">Home</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={'/'}><h2 className="nav-link">Explore</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={'/'}><h2 className="nav-link">Contact</h2></Link>
                </div>
                <div className="nav-box">
                    <Link to={'/'}><h2 className="nav-link">Donate</h2></Link>
                </div>
            </nav>
        </section>
    )
}

