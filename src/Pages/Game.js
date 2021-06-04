import { useEffect, useContext } from 'react'
import axios from 'axios'
import '../Styles/Game.css'
import Chat from '../Components/Chat'
import DiceBox from "../Components/DiceBox"
import UserBar from '../Components/UserBar'
import GameField from '../Components/GameField'

import { SocketContext } from '../Context/SocketContext'

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
        const userId = localStorage.getItem('userId')
        const gameId = localStorage.getItem('gameId')
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/game/login`, {
            headers:{ 
                authorization: userId,
                gameauth: gameId
            }
        })
    } else if( document.visibilityState === 'hidden') {
        const userId = localStorage.getItem('userId')
        const gameId = localStorage.getItem('gameId')
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/game/logout`, {
            headers:{ 
                authorization: userId,
                gameauth: gameId
            }
        })
    }
  });

const Game = () => {
    const socket = useContext(SocketContext)

    useEffect(() => {
        console.log("socket")
        socket.on('connect', () => {
            console.log('socketId', socket.id, socket.connected);
        })

        return () => {
            socket.off('connection')
        }
    }, [])

    return(
        <div className="gameScreen">
            <div className="playArea">
                <UserBar />
                <GameField />
            </div>
            <div className="chatArea">
                <Chat />
                <DiceBox />
                <div className="playerInfo">Player Info</div>
            </div>
            
        </div>
        
    )
}
export default Game