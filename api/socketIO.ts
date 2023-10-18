import { Socket, io } from "socket.io-client";
import { api_url } from "../env";
import * as secureStorage from "expo-secure-store";
import { onMessageReceiveCallback } from "../types/General";
import { IReport } from "../types/Models/Report";

type emitSendMessageArgs = {
  receiverID: string;
  forwardedReport?: Pick<IReport, "_id" | "form" | "location">;
  time: Date;
  message: string;
};


const getSocket = async () => {
  let socket: Socket = null;
  const token = await secureStorage.getItemAsync("jwt");
  
  return new Promise<Socket>((resolve, reject) => {
    if (socket) {
      socket.connect();
      resolve(socket);
    } else {
      socket = io(`${api_url}`, {
        auth: { token: token },
        reconnection: true,
        reconnectionDelay: 200,
        reconnectionDelayMax: 200,
        reconnectionAttempts: Infinity,
      });
      ;

      socket.on("connect", () => {
        ;
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
        ;
      });
    }
  });
};

export async function sendMessage({ receiverID, message, forwardedReport }: emitSendMessageArgs) {
  const socket =await getSocket();
  socket.emit("sendMessage", receiverID, { message, forwardedReport }, (ack) => {
  })
}

export async function getPendingMessages() {
  const socket =await getSocket();
  socket.emit("getPendingMessages");
}

export async function addOnMessageReceiveListener(callBack: onMessageReceiveCallback) {
  const socket =await getSocket();
        socket.on("receiveMessage", (...args) => {
          const [senderID, message] = args;
          callBack({ senderID: senderID, message: message.message, forwardedReport: message.forwardedReport, time: message.time });
        })
}

export async function disconnectSocket() {
  getSocket().then((socket) => {
  socket.disconnect();
  socket.removeAllListeners();
  },
  (err) => {
    throw err;
  })
  ;
}

export default getSocket;
