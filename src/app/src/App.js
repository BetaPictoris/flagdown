import React from 'react';
import axios from 'axios';

import './styles/App.scss'

export default function App() {
  const [connection, setConnection] = React.useState(false);

  React.useEffect(() => {
    axios("/api/v1/ping")
      .then(response => {
        if (response.data) { setConnection(true) }
      })
  }, [])

  return (
    <div className='App'>
      <div className='Footer'>
        Made with ❤ by <a href="//github.com/BetaPictoris">Beta Pictoris</a>.<br></br>
        {connection ? "Connected to API" : "Not connected to API"}
      </div>
    </div>
  );
}
