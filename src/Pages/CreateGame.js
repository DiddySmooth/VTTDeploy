import axios from 'axios'
import {useState, useContext} from 'react'

import {GameContext} from '../Context/GameContext'

import '../Styles/CreateJoinGame.css'


const CreateGame = () => {
    /////  CONTEXT ///////
    const {gameState} = useContext(GameContext)
    
    ////// STATE //////
    const [game,setGame] = gameState
    const [title,setTitle] = useState('')
    const [password,setPassword] = useState('')

    ///// CALLS TO BACKEND TO CREATE A GAME AND SIGNS USER INTO THAT GAME /////
    const CreateGameSubmit = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/create`, {
            headers:{ 
                authorization: userId
            },
            body:{
                title: title,
                password: password
            }
            
        })
        localStorage.setItem('gameId', res.data.gameId)
        setGame(res.data.game)
        let res1 = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/userlogin`, {
            headers:{
                authorization: userId,
                gameauth: res.data.encryptedId
            }
        })
    }

    ////// logs player into game //////
    const loginGameSubmit = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/login`, {
            headers:{ 
                authorization: userId
            },
            body:{
                title: title,
                password: password
            }
            
        })
        localStorage.setItem('gameId', res.data.encryptedId)
        setGame(res.data.game)
        let res1 = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/userlogin`, {
            headers:{
                authorization: userId,
                gameauth: res.data.encryptedId
            }
        })
    }

    return (
        <div className="createGamePage">
            <div className="createGameContainer">
                <h2 className="createGameTitle">CreateGame</h2>
                <form className="createLoginContainer" onSubmit={CreateGameSubmit}>
                    <input className="gamePageInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className="gamePageInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className="gamePageInput" list="ruleset" placeholder="Ruleset"></input>
                    <datalist id="ruleset">
                        <option className="gamePageInput" value ="Dungeons and Dragons 5e"/>
                        <option className="gamePageInput" value ="Dungeons and Dragons 4e"/>
                        <option className="gamePageInput" value ="Dungeons and Dragons 3e"/>
                        <option className="gamePageInput" value ="Dungeons and Dragons 2e"/>
                        <option className="gamePageInput" value ="Dungeons and Dragons 1e"/>
                    </datalist>
                    <input className="gamePageInput" type="submit" value="submit" />
                    
                    
                </form>
            </div>
            <div className="loginGameContainer">
                <h2 className="createGameTitle">Join Existing Game</h2>
                <form className="createLoginContainer" onSubmit={loginGameSubmit}>
                    <input className="gamePageInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input className="gamePageInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className="gamePageInput" type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}

export default CreateGame 