import '../Styles/CreateJoinGame.css'
import {useState, useContext} from 'react'
import {GameContext} from '../Context/GameContext'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const CreateGame = () => {
    const {gameState} = useContext(GameContext)
    const [game,setGame] = gameState
    
    // form input states 
    const [title,setTitle] = useState('')
    const [password,setPassword] = useState('')
    
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
        console.log(res1)
    }
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
        console.log(res1)
    }

    return (
        <div className="createGamePage">
            <div className="createGameContainer">
                <h2>CreateGame</h2>
                <form className="createLoginContainer" onSubmit={CreateGameSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="submit" />
                </form>
            </div>
            <div className="loginGameContainer">
                <h2>Join Existing Game</h2>
                <form className="createLoginContainer" onSubmit={loginGameSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}

export default CreateGame 