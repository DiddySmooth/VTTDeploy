import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import { GameContext } from "../../../Context/GameContext"
import { UserContext } from "../../../Context/UserContext"
import { SocketContext } from '../../../Context/SocketContext'

import '../../../Styles/Chat.css'

let messagesEnd;




const Chat = () =>{
    /////   CONTEXT /////
    const {userState} = useContext(UserContext)
    const {gameState} = useContext(GameContext)
    const socket = useContext(SocketContext);

    //////  STATE //////
    const[user,setUser] = userState
    const[game, setGame] = gameState
    const[allChats,setAllChats] = useState([])
    const[body, setBody] = useState("")

    ///// sockets listening for messages /////
    useEffect(() => {
        getAllChats()
        socket.on("refreshChat", function() {
            getAllChats()
        })
      }, []);
    
    ///// user joins room based on game Id on the backend /////  
    socket.emit("room", game.id)

    ///// handles when user hits enter or submit on the chat bar/////
    const CreateChat = async (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const gameId = localStorage.getItem('gameId')

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
        socket.emit("Message", body); 
        setBody("")
         
    }


    /////gets all the messages in the chat /////
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

    //// used to scroll chat to the bottom going to remove this/////
    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => scrollToBottom(), [allChats])

    return(
        <div className="Chat">
                <div className="chatContainer">
                    {game ? "Chat": <Redirect to="/login" />}
                    
                    <div className="chatLog">
                        {allChats.map((chat, i) =>
                            <p key ={i}>{chat.author}:{chat.body}</p>
                        )}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { messagesEnd = el; }}>
                                
                        </div>
                    </div>    
                    <div className="chatForm">
                        <form onSubmit={CreateChat}>
                            <input className="chatButton" type="submit" value="SEND" />
                            <input className="chatInput" type="text" placeholder="Chat" value={body} onChange={(e) => setBody(e.target.value)} />    
                        </form>    
                    </div>
                </div>
                
            </div>
    )
}
export default Chat