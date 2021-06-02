import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import { SocketContext } from '../Context/SocketContext'


const jwt = require('jsonwebtoken')

const UserBar = () => {
    const[allUsers, setAllUsers] = useState([""])
    const[allUsersPictures, setAllUsersPictures] = useState(null)
    const socket = useContext(SocketContext);



    const getAllUsers = async() => {
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
    useEffect(() => {
        getAllUsers()
        socket.on("refreshUserBar", function() {
            getAllUsers()
        })
    }, [])


    const getAllPictures = async() => {
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
        
    }


    useEffect(() => {
        getAllPictures()
    }, [allUsers])



    return(
        <div>
            <div className="userBar">  
                {allUsersPictures && allUsersPictures.map((user, i) => 
                    user && 
                    <div key={i}className="userBarSpot">
                        <img key={i}className="playerPic" src={user.picture && user.picture}/>
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