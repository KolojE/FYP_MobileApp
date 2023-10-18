import { useDispatch } from "react-redux";
import chat, { addMessage, readMessage, receiveMessageError, receiveMessageSuccess, retrieveAllChat, sendMessageError, startSendingMessage } from "../redux/chat";
import { sendMessage } from "../api/socketIO";
import { sendMessageArgs } from "../types/General";
import { chatDBInit } from "../sqlite/sqlite";



const chatDB = chatDBInit()
export const useChatAction = () => {
    const dispatch = useDispatch();
    const sendMessageAction = async ({ message, receiverID, forwardedReport,time }: sendMessageArgs) => {
        try {
            dispatch(startSendingMessage())
            chatDB.insertMessage({ chatId: receiverID, message, receive: false, forwardedReport,time})
            await sendMessage({ message, receiverID, forwardedReport,time});
            dispatch(addMessage({ msg: message, receiverID, receive: false, forwardedReport,time:time.toLocaleString() }));
        } catch (err) {
            dispatch(sendMessageError(err.message))
        }
    }

    const receiveMessageAction = ({ message, senderID, forwardedReport,time }) => {
        try {
            dispatch(addMessage({ msg: message, receiverID: senderID, receive: true, forwardedReport: forwardedReport,time:time}));
            chatDB.insertMessage({ chatId: senderID, message: message, receive: true, forwardedReport: forwardedReport,time:time})
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
                        chatLog: [{ msg: row.message, receive: JSON.parse(row.receive), forwardedReport: JSON.parse(row.forwardedReport ?? null),time:new Date(row.time).toLocaleString() }],
                        unRead: true
                    }
                }
                else {
                    chats[row.chatId].chatLog.push({ msg: row.message, receive: JSON.parse(row.receive),time:new Date(row.time).toLocaleString(),forwardedReport: JSON.parse(row.forwardedReport ?? null) })
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