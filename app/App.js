import React from "react";

import "./styles/App.scss";

import Home from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <div className="Header">{/* TODO: Add a header */}</div>

      <div className="AppCont">
        <Home />
      </div>

      <div className="Footer">
        Made with ❤ by <a target="_blank" href="//www.ozx.me">Beta Pictoris</a>.
      </div>
    </div>
  );
}
