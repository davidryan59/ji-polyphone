import React from 'react';
import logo from './logo.svg';
import './App.css';

const doStart = e => {
  console.log('Starting...')
}

const doStop = e => {
  console.log('Stopping...')
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="button" value="Play nice music" onClick={doStart} />
        <input type="button" value="Stop nice music" onClick={doStop} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
