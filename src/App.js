import '../src/Styles/App.css';
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from './Context/UserContext'
import {GameContext} from "./Context/GameContext"
import {useEffect, useContext} from 'react'
import axios from 'axios'

import NavBar from './Components/NavBar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import CreateGame from './Pages/CreateGame'
import Game from './Pages/Game';

function App() {
  const {userState} = useContext(UserContext)
  const {gameState} = useContext(GameContext)
  const[user,setUser] = userState
  const[game, setGame] = gameState


  const getUserInfo = async () => {
    const userId = localStorage.getItem('userId')
    try {
      let user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getInfo` ,{
      headers:{
        authorization: userId
      }
    })
    if(user.data.user) {
      setUser(user.data)  
    }
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(() => {
    getUserInfo()
  },[])

  const getGameInfo = async () => {
    const gameId = localStorage.getItem('gameId')
    try {
      let game = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/game/getinfo` ,{
      headers:{
        authorization: gameId
      }
    })
    if(game.data.game) {
      setGame(game.data)  
    }
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(() => {
    getGameInfo()
  },[])

  return (
    <div className="App">
      <NavBar />

      <Route exact path="/">
        {user ? 
          <Redirect to="/create" />
        :
          <Login />
        }
      </Route>

      <Route exact path="/create">
      {game ? 
        <Redirect to="/game"/>
        :
        <CreateGame />
        }
        
      </Route>

      <Route exact path="/login">
        {user ? 
          <Redirect to="/create" />
        :
          <Login />
        }
      </Route>

      <Route exact path="/register">
        {user ? 
          <Redirect to="/create" />
        :
          <Register />
        }
      </Route>

      <Route exact path="/game">
        {user ? 
          <Game />
        :
          <Redirect to="/" />
        }
      </Route>
    </div>
  );
}

export default App;
