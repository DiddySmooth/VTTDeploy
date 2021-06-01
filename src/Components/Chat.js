import '../Styles/Chat.css'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { GameContext } from "../Context/GameContext"
import { UserContext } from "../Context/UserContext"
import { SocketContext } from '../Context/SocketContext'
import socketIOClient from "socket.io-client"
import {Redirect} from 'react-router-dom'
let messagesEnd;




const Chat = () =>{
    /////Gettings user and game from stores /////
    const {userState} = useContext(UserContext)
    const[user,setUser] = userState
    const {gameState} = useContext(GameContext)
    const[game, setGame] = gameState
    const socket = useContext(SocketContext);
    /////Seting up States /////
    const[allChats,setAllChats] = useState([])
    const[body, setBody] = useState("")

    useEffect(() => {
        getAllChats()
        socket.emit("USER_ONLINE", user.userId); 

      }, []);

    const CreateChat = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const gameId = localStorage.getItem('gameId')
        console.log(typeof(body))
        console.log(userId)
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/create`, {
            headers:{ 
                authorization: userId,
                gameauth: gameId
            },
            body:{
                author: user.username,
                body: body
            }
            
        })
        setBody("")

        
    }
    
    
    const getAllChats = async() => {
        try {
            const userId = localStorage.getItem('userId')
            const gameId = localStorage.getItem('gameId')
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/getall`, {
            headers:{ 
                authorization: userId,
                gameauth: gameId
            }})
            res.data.chats.sort(function(x, y){
                return x.timestamp - y.timestamp;
            })
            setAllChats(res.data.chats)
            
            
        } catch (error) {
            console.log(error)
        }
        
    }


    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => scrollToBottom(), [allChats])

    return(
        <div className="Chat">
                <div className="chatContainer">
                    {game ? "Chat": <Redirect to="/login" />}
                    <form className="chatForm" onSubmit={CreateChat}>
                            <input type="text" placeholder="Chat" value={body} onChange={(e) => setBody(e.target.value)} />
                            <input type="submit" value="submit" />
                    </form>
                    <div className="chatLog">
                        {allChats.map((chat, i) =>
                            <p key ={i}>{chat.author}:{chat.body}</p>
                        )}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { messagesEnd = el; }}>
                                
                        </div>
                    </div>        
                </div>
                
            </div>
    )
}
export default Chat