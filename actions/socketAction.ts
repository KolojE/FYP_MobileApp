import { useDispatch } from "react-redux"
import { socketDisconnect, socketFailure, socketStart, socketSuccess } from "../redux/socket";
import getSocket, { addOnMessageReceiveListener, disconnectSocket, getPendingMessages } from "../api/socketIO";
import { useChatAction } from "./chatAction";





export const useSocketAction = () => {

    const dispatch = useDispatch();
    const chatAction= useChatAction();

    const establishConnection = async () => {
        const socket = await getSocket();

        try {
            dispatch(socketStart());
            if(!socket.hasListeners("receiveMessage")){
            await addOnMessageReceiveListener(chatAction.receiveMessageAction)
            }
            getPendingMessages();
            dispatch(socketSuccess());
        } catch (err) {
                        dispatch(socketFailure(err.message));
            socket.removeAllListeners()
        }

    }

    const disconnect = () => {
        try{
            disconnectSocket();
            dispatch(socketDisconnect());
        }catch(err){
                        dispatch(socketFailure(err.message));
        }
    }
        return { establishConnection, disconnect }
}