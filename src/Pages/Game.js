import { useEffect, useContext } from 'react'

import '../Styles/Game.css'
import Chat from '../Components/Chat'
import DiceBox from "../Components/DiceBox"
import UserBar from '../Components/UserBar'
import GameField from '../Components/GameField'

import { SocketContext } from '../Context/SocketContext'

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