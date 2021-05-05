import {useState, createContext } from 'react'
import axios from 'axios'
const GameContext = createContext()

const GameProvider = ({children}) => {
    const [game,setGame] = useState(null)

    const state = {
        gameState: [game,setGame]        
    }

    
    return (
        <GameContext.Provider value={state}>
            {children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider}