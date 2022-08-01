import React from "react";

import '../css/Home.css';
import UserEndpoint from "./UserEndpoint";

const code = new URLSearchParams(window.location.search).get('code')

export default function Home() {
    return (
        <div className="Home">
            <main className="Home-header">
                <UserEndpoint code={code}></UserEndpoint>
            </main>
        </div>
    );
}

