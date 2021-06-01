import React from 'react';
import ReactDOM from 'react-dom';
import '../src/Styles/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {UserProvider} from './Context/UserContext'
import {GameProvider} from './Context/GameContext'

import {SocketContext, socket} from './Context/SocketContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <SocketContext.Provider value={socket}>
            <GameProvider>
                <UserProvider>
                    <App />
                 </UserProvider>
            </GameProvider>
        </SocketContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
