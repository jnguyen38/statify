import React from "react";
import '../css/Header.css';

import { Link } from 'react-router-dom';

export default function SiteHeader() {
    return (
        <header>
            <img src="../media/statify-logo-green.png" alt="logo"/>

            <Link to={'/'}>
                <h1>Statify</h1>
            </Link>
        </header>
    )
}

