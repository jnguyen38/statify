import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
    return (
        <main>
            <h1>Hello, this is Info.</h1>
            <Link to={'../'}>Back to Home</Link>
        </main>
    );
}
