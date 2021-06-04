import axios from 'axios';
import { useState, useEffect, useContext } from 'react'
import Draggable from 'react-draggable';

import { SocketContext } from '../Context/SocketContext'

const GameField = () => {

    ////// CONTEXT //////
    const socket = useContext(SocketContext);

    /////   STATE /////
    const [name, setName] = useState("")
    const [picture, setPicture] = useState("")
    const [allTokens, setAllTokens] = useState([])

    const gameId = localStorage.getItem('gameId')

    ///// Join socket room based on gmae ID
    socket.emit("room", gameId)

    ///// gets the position on drop of peice and sends api request to move to backend
    const eventControl = async (event, info) => {
        const name = info.node.getAttribute("data-token")
        let res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/token/move`, {
            name: name,
            gameId: gameId,
            x: info.x,
            y: info.y
        })
        socket.emit("refreshBoard")
    }
    ///// Things that go off on start and any socket.on
    useEffect(() => {
        getAllTokens()
        socket.on("refreshBoard", function() {
            console.log("refresh board")
            getAllTokens()
        })
      }, []);

    ///// Adding token to the field /////
    const tokenSubmit = async (e) => {
        e.preventDefault()

        const gameId = localStorage.getItem('gameId')
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/create`, {
            name: name,
            picture: picture,
            gameId: gameId
        })
        socket.emit("refreshBoard")
    }

    //// get the position of all tokens on the field /////
    const getAllTokens = async () => {
        try {
            const gameId = localStorage.getItem('gameId')
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/token/get`, {
                headers:{
                    gameId: gameId
                }
                
            })
            setAllTokens(res.data.tokens)
        } catch (error) {

        }
    }



    return (
        
            <div className="playField">
                <div className="controlBox">
                    <form className="tokenForm" onSubmit={tokenSubmit}>
                        <input className="tokenFormInput" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="tokenFormInput" type="text" placeholder="Picture" value={picture} onChange={(e) => setPicture(e.target.value)} />
                        <input className="tokenFormButton" type="submit" value="submit" />
                    </form>
                </div>
                {allTokens && allTokens.map((token, i) =>
                    token  &&
                    <Draggable key={i} onStop={eventControl} grid={[50, 50]} position={{x:token.x, y:token.y}} disabled={false} handle=".playerPic">
                        <img data-token={token.name} draggable="false" className="playerPic"src={token.picture}/>
                    </Draggable>
                    
                )}
            </div>
        
    )
}
// position={100, 100}
export default GameField