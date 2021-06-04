import {useState, createContext } from 'react'
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