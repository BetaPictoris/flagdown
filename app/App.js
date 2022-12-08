import React from "react";

import "./styles/App.scss";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

import Home from "./pages/Home";

export default function App() {
  const [path, setPath] = React.useState(window.location.hash.replace("#", "").split("/"));
  onhashchange = () => {
    setPath(window.location.hash.replace("#", "").split("/"));
  };

  return (
    <div className="App">
      <div className="Header">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {path.map((i) => (
          <BreadcrumbItem>
            <BreadcrumbLink>{i}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      </div>

      <div className="AppCont">
        <Home />
      </div>

      <div className="Footer">
        Made with ❤ by <a target="_blank" href="//www.ozx.me">Beta Pictoris</a>.
      </div>
    </div>
  );
}
