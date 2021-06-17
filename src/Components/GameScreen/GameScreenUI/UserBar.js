import axios from 'axios'
import {useEffect, useState, useContext} from 'react'

import { GameContext } from "../../../Context/GameContext"
import { SocketContext } from '../../../Context/SocketContext'

const jwt = require('jsonwebtoken')

const UserBar = () => {
    /////   CONTEXT     /////
    const {gameState} = useContext(GameContext)
    const socket = useContext(SocketContext);

    /////   STATE   /////
    const[allUsers, setAllUsers] = useState([""])
    const[allUsersPictures, setAllUsersPictures] = useState(null)
    const[game, setGame] = gameState
    
    socket.emit("room", game.id)
    

    //// calls api to find out all players in game /////
    const getAllUsers = async() => {
        console.log("Getting all users")
        try {
            const gameId = localStorage.getItem('gameId')
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/game/gameusers`, {
            headers:{ 
                gameauth: gameId
            }})
            setAllUsers(res.data.foundRecord)
        } catch (error) {
            console.log(error)
        }
    }
    ///// gets all the users pictures /////
    const getAllPictures = async() => {
        console.log("Getting all pictures")
        let newUserArray = []
        allUsers.map(async (users, i) =>  {
            
            const encryptedId = jwt.sign({userId: users.userId}, process.env.REACT_APP_JWT_SECRET)
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getinfo`, {
            headers:{
                authorization: encryptedId
            }
        
        })
        newUserArray.push(res.data.user)
        
        setAllUsersPictures(newUserArray)
        })
        console.log(allUsersPictures)
    }


    ///// use effects for on load and socket.ons /////
    useEffect(() => {
        getAllPictures()
    }, [allUsers])

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        socket.on("refreshUserBar", function() {
            getAllUsers()
        })
    })

    return(
        <div>
            <div className="userBar">  
                {allUsersPictures && allUsersPictures.map((user, i) => 
                    
                    user && 
                    
                    <div key={i}className="userBarSpot">
                        <img className="playerPic" src={user.picture}/>
                    </div>


                    
                )}
                <div className="settings">
                    <img className="settingsImg"src="https://www.clipartmax.com/png/middle/243-2433250_gear-options-setup-comments-settings-wheel.png"/>
                </div>                
            </div>
        </div>
    )
}
export default UserBar