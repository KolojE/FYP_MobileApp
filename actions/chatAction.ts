import { useDispatch } from "react-redux";
import { addMessage, readMessage, receiveMessageError, receiveMessageSuccess, sendMessageError, startSendingMessage } from "../redux/chat";
import { sendMessage } from "../api/socketIO";
import { sendMessageArgs } from "../types/General";



export const useChatAction = () => {
    const dispatch = useDispatch();
    const sendMessageAction = async ({ message, receiverID }: sendMessageArgs) => {
        try {
            dispatch(startSendingMessage())
            await sendMessage({ message, receiverID });
            dispatch(addMessage({ msg: message, receiverID, receive: false }));
        } catch (err) {
            dispatch(sendMessageError(err.message))
        }

    }

    const receiveMessageAction = async ({ message, senderID }) => {
        try {
            dispatch(addMessage({ msg: message, receiverID: senderID, receive: true }));
            dispatch(receiveMessageSuccess())
        } catch (err) {
            dispatch(receiveMessageError(err.message))
        }

    }

    const readMessageAction = async ({ receiverID }) => {
        dispatch(readMessage({ receiverID }))
    }

    return { sendMessageAction, receiveMessageAction, readMessageAction }

}