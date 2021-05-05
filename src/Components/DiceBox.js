import '../Styles/DiceBox.css'
import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import {UserContext} from "../Context/UserContext"
const DiceBox = () => {
    const {userState} = useContext(UserContext)
    const[user,setUser] = userState

    const DiceRoll = async (num) => {
        const userId = localStorage.getItem('userId')
        const gameId = localStorage.getItem('gameId')
        let roll = (Math.floor(Math.random() * num))
        console.log(roll+1)

        let res = await axios.post('http://localhost:3001/chat/create', {
            headers:{ 
                authorization: userId,
                gameauth: gameId
            },
            body:{
                author: user.username,
                body: roll + 1
            }
            
        })
    }
    return(
        <div>
            <div className="diceBox">
                    <button className="diceButton" onClick={ () => {DiceRoll(20)}}>D20</button>
                    <button className="diceButton" onClick={ () => {DiceRoll(12)}}>D12</button>
                    <button className="diceButton" onClick={ () => {DiceRoll(10)}}>D10</button>
                    <button className="diceButton" onClick={ () => {DiceRoll(8)}}>D8</button>
                    <button className="diceButton" onClick={ () => {DiceRoll(6)}}>D6</button>
                    <button className="diceButton" onClick={ () => {DiceRoll(4)}}>D4</button>
                </div>
        </div>
    )
}
export default DiceBox