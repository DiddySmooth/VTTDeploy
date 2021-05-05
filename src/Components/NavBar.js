import '../Styles/NavBar.css'
import {useState, useContext} from 'react'
import {UserContext} from '../Context/UserContext'
import {Link} from 'react-router-dom'
import { GameContext } from '../Context/GameContext'
const NavBar = () => {
    const {userState} = useContext(UserContext)
    const[user,setUser] = userState
    const {gameState} = useContext(GameContext)
    const[game,setGame] = gameState



    const logout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("gameId")
        setGame(null)
        setUser(null)
    }
    return(
        <div className="navBarContainer">
            {user ?
            <>
            <span  onClick={() => logout()}><Link className="navLink" to="/">Logout</Link></span>
            </>
            :
            <>
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/register">Register</Link>
            <Link className="navLink" to="/login">Login</Link> 
            </>
            }
        </div>
    )
}
export default NavBar