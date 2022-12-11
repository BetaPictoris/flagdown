import React from "react";

import "./styles/App.scss";

import Header from "./components/Header";

import Home from "./pages/Home";
import Project from "./pages/Project";

export default function App() {
  const [path, setPath] = React.useState(
    window.location.hash.replace("#", "").split("/")
  );
  onhashchange = () => {
    setPath(window.location.hash.replace("#", "").split("/"));
  };

  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>

      <div className="AppCont">
        {path[0] === "" && <Home />}
        {path[0] === "project" && <Project projectID={path[1]} />}
      </div>

      <div className="Footer">
        Made with ❤ by{" "}
        <a target="_blank" rel="noreferrer" href="//www.ozx.me">
          Beta Pictoris
        </a>
        .
      </div>
    </div>
  );
}
