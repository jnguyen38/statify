import { Link } from "react-router-dom";
import React from "react";

import logo from '../media/logo.svg';
import '../css/App.css';

export default function App() {
  return (
    <div className="App">
      <main className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Generic App
        </p>
        <Link to={"../info"}>More Info</Link>
      </main>
    </div>
  );
}

