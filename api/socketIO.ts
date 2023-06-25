import { Socket, io } from "socket.io-client";
import { api_url } from "../env";
import * as secureStorage from "expo-secure-store";
import { onMessageReceiveCallback } from "../types/General";



type emitSendMessageArgs = {
  receiverID: string,
  message: string,
}

let socket: Socket = null;

const getSocket = async () => {

  const token = await secureStorage.getItemAsync("jwt");
  return new Promise<Socket>((resolve, reject) => {
    if (socket) {
      socket.connect();
      console.log("socket connected")
      resolve(socket);
    } else {
      socket = io(`${api_url}`, {
        auth: { token: token },
        reconnection: true,
        reconnectionDelay: 200,
        reconnectionDelayMax: 200,
        reconnectionAttempts: Infinity,
      });
      console.log("new socket created")

      socket.on("connect", () => {
        console.log("socket connected");
        resolve(socket);
      });

      socket.on("error", (error) => {
        reject(error);
      });

      socket.on("connect_error", (error) => {
        reject(error);
      });

      socket.on("connect_timeout", (timeout) => {
        reject(new Error(`Connection timeout (${timeout}ms)`));
      });

      socket.on("disconnect", (reason) => {
        console.log(reason + " socket disconnected")
      })
    }
  });
};





export function sendMessage({ receiverID, message }: emitSendMessageArgs) {
  socket.emit("sendMessage", receiverID, message, (ack) => {
    console.log("ack", ack);
  });
}

export function getPendingMessages() {
  socket.emit("getPendingMessages");
}


export function addOnMessageReceiveListener(callBack: onMessageReceiveCallback) {
  console.log("add on message receive listener")

  return new Promise((resolve, reject) => {
    try {
      resolve(
        socket.on("receiveMessage", (...args) => {
          const [senderID, message] = args
          console.log("message received", args)
          callBack({ senderID: senderID, message: message });
        })
      )
    } catch (err) {
      reject(err)
    }

  })
}

export function disconnectSocket() {
  socket.disconnect()
  socket.removeAllListeners()
  socket = null;
  console.log("socket disconnected", socket)
}

export default getSocket;