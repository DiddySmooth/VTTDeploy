import React from 'react';
import ReactDOM from 'react-dom';
import '../src/Styles/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {UserProvider} from './Context/UserContext'
import {GameProvider} from './Context/GameContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <GameProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </GameProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
