import React, { useEffect } from 'react';
import './App.css';
import socketIO from 'socket.io-client';

const WS = 'http://localhost:8080';

function App() {
  useEffect(() => {
    const socket = socketIO(WS);
    socket.on('connect', () => {
      console.log('connected to server');
    });
  }, []);

  return (
    <div className='App'>
      <button>Start new meeting</button>
    </div>
  );
}

export default App;
