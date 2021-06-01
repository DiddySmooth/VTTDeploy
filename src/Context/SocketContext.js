import socketIOClient from "socket.io-client";
import React from 'react'
const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:3001";
export const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
export const SocketContext = React.createContext()


  