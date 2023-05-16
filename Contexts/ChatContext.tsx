import React, { createContext, useContext, useState } from 'react';
import { SocketContext } from './SocketConnection';
import { disconnectSocket, onMessageReceive, sendMessage } from '../api/socketIO';

type Chat = {
  [key: string]: {
    chatLog: {
      msg: string,
      reply: boolean,
    }[]
  }
}

const ChatContext = createContext<[Chat, React.Dispatch<React.SetStateAction<Chat>>]|undefined>(undefined);

const Chat = ({ children }) => {
  const [chat, setChat] = useState<Chat>({});

React.useEffect(()=>{
  console.log("mounted")
  onMessageReceive(({ message, senderID }) => {
  console.log(message+senderID)
    setChat(prev => {
      if(!prev[senderID])
      {
        prev[senderID] = {chatLog:[{msg:message,reply:true}]}
      return { 
        ...prev,
      }
      }

      prev[senderID].chatLog.push({ msg: message, reply: true})
      return {...prev}
    } );

  })
},[])
  



return (
  <ChatContext.Provider value={[chat, setChat]}>
    {children}
  </ChatContext.Provider>
)
};

export { ChatContext, Chat };
