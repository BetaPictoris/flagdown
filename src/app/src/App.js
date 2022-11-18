import React from 'react';
import axios from 'axios';

export default function App() {
  const [data, setData] = React.useState('Waiting...');

  const handlePing = async () => {
      try {
          const response = await axios.get('/api/v1/ping');
          setData(response.data);
      } catch (e) {
        setData('Failed to ping');
      }

      setTimeout(() => setData('Waiting...'), 2000);
  }

  return (
    <div className="App">
      <div><pre>{data}</pre></div>
      <button onClick={handlePing}>Ping</button>
    </div>
  );
}
