import { useDispatch } from "react-redux";
import chat, { addMessage, readMessage, receiveMessageError, receiveMessageSuccess, retrieveAllChat, sendMessageError, startSendingMessage } from "../redux/chat";
import { sendMessage } from "../api/socketIO";
import { sendMessageArgs } from "../types/General";
import { chatDBInit } from "../sqlite/sqlite";



const chatDB = chatDBInit()

export const useChatAction = () => {
    const dispatch = useDispatch();
    const sendMessageAction = async ({ message, receiverID,forwardedReport}: sendMessageArgs) => {
        try {
            dispatch(startSendingMessage())
            chatDB.insertMessage({ chatId: receiverID, message, receive: false,forwardedReport })
            await sendMessage({ message, receiverID,forwardedReport});
            dispatch(addMessage({ msg: message, receiverID, receive: false,forwardedReport }));
        } catch (err) {
            dispatch(sendMessageError(err.message))
        }
    }

    const receiveMessageAction = async ({ message, senderID,forwardedReport }) => {
        try {
            dispatch(addMessage({ msg: message, receiverID: senderID, receive: true,forwardedReport:forwardedReport }));
            chatDB.insertMessage({ chatId: senderID, message:message, receive: true,forwardedReport:forwardedReport })
            chatDB.getAllMessages(senderID, (row) => {
                            })
            dispatch(receiveMessageSuccess())
        } catch (err) {
            dispatch(receiveMessageError(err.message))
        }

    }

    const readMessageAction = async ({ receiverID }) => {
        dispatch(readMessage({ receiverID }))
    }

    const retrieveAllChatAction = async () => {
        const chatDB = chatDBInit()
        const chats = {}
        chatDB.getAllChats((rows) => {
                        
            rows.forEach((row) => {
                                if (!chats[row.chatId]) {
                    chats[row.chatId] = {
                        chatLog: [{ msg: row.message, receive: JSON.parse(row.receive), forwardedReport:JSON.parse(row.forwardedReport??null) }],
                        unRead: true
                    }
                }
                else {
                    chats[row.chatId].chatLog.push({ msg: row.message, receive: JSON.parse(row.receive) })
                    chats[row.chatId].unRead = true
                }
            }
            )
                    dispatch(retrieveAllChat(chats))
        }
        )

    }

    return {
        sendMessageAction,
        receiveMessageAction,
        readMessageAction,
        retrieveAllChatAction
    }

}