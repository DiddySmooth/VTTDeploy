import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import useInterval from '../Hooks/useInterval'

const jwt = require('jsonwebtoken')

const UserBar = () => {
    const[allUsers, setAllUsers] = useState([""])
    const[allUsersPictures, setAllUsersPictures] = useState(null)
    const[count, setCount] = useState(0)



    const getAllUsers = async() => {
        try {
            const gameId = localStorage.getItem('gameId')
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/game/gameusers`, {
            headers:{ 
                gameauth: gameId
            }})
            console.log(res.data.foundRecord)
            setAllUsers(res.data.foundRecord)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

console.log(allUsers)

    const getAllPictures = async() => {
        let newUserArray = []
        allUsers.map(async (users, i) =>  {
            
            const encryptedId = jwt.sign({userId: users.userId}, process.env.REACT_APP_JWT_SECRET)
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getinfo`, {
            headers:{
                authorization: encryptedId
            }
        
        })
        console.log(res.data)
        newUserArray.push(res.data.user)
        setAllUsersPictures(newUserArray)
        })
        
    }


    useEffect(() => {
        getAllPictures()
    }, [allUsers])

    console.log(allUsersPictures)

    return(
        <div>
            <div className="userBar">  
                {allUsersPictures && allUsersPictures.map((user, i) => 
                    user && 
                    <div key={i}className="userBarSpot">
                        {console.log(user)}
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