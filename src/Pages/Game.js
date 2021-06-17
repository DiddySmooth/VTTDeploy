import { useEffect, useContext } from 'react'
import axios from 'axios'
import '../Styles/Game.css'

import Chat from '../Components/GameScreen/Chat/Chat'
import DiceBox from "../Components/GameScreen/Chat/DiceBox"
import UserBar from '../Components/GameScreen/GameScreenUI/UserBar'
import GameField from '../Components/GameScreen/GameField/GameField'
import PlayerInfo from '../Components/GameScreen/PlayerInfo/PlayerInfo'

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
                <PlayerInfo />
            </div>
            
        </div>
        
    )
}
export default Game