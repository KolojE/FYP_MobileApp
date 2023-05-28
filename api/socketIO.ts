import { Socket, io } from "socket.io-client";
import { api_url } from "../env";
import * as secureStorage from "expo-secure-store";



type emitSendMessageArgs = {
    receiverID: string,
    message: string,
}

type onMessageReceiveArgs = ({ senderID, message }) => void


let socket: Socket = null;

const getSocket = async () => {
    const token = await secureStorage.getItemAsync("jwt");
    if (!socket) {
        socket = io(`${api_url}`, {
            auth: { token: token }
        })
    }
    socket.on("connect", () => {
        console.log("connected")
    })
    socket.on("error", (error) => {
        console.log(error)
    })
    return socket;
}


export function sendMessage({ receiverID, message }: emitSendMessageArgs) {
    socket.emit("sendMessage", receiverID, message);
}


export function onMessageReceive(callBack: onMessageReceiveArgs) {
    socket.on("receiveMessage", (...args) => {
        console.log(args)
        const [senderID, message] = args
        callBack({ senderID: senderID, message: message });
    })
}

export function disconnectSocket()
{
    socket.removeAllListeners()
    socket.disconnect();
}

getSocket()

export default getSocket;