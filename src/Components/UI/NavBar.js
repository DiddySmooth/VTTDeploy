import {useContext} from 'react'
import {Link} from 'react-router-dom'

import {UserContext} from '../../Context/UserContext'
import { GameContext } from '../../Context/GameContext'

import '../Styles/NavBar.css'

const NavBar = () => {
    ///// Context /////
    const {userState} = useContext(UserContext)
    const {gameState} = useContext(GameContext)
    
    /////   STATE   //////
    const[user,setUser] = userState
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
            <div>
                <Link className="navLink" to="/home">Home</Link>
            </div>
            <div>
                <Link className="navLink" to="/register">Register</Link>
            </div>
            <div>
                <Link className="navLink" to="/login">Login</Link> 
            </div>
            </>
            }
        </div>
    )
}
export default NavBar