import React, { createContext, useState } from 'react';
import getSocket from '../api/socketIO';
import { Socket } from 'socket.io-client';


const SocketContext = createContext<Socket>(null)

const SocketConnection = ({ children }) => {
    const [socket, setSocket] = useState(null);
    getSocket().then((socket) => {
        setSocket(
            socket
        )

    })
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketConnection };