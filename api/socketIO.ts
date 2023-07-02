import { Socket, io } from "socket.io-client";
import { api_url } from "../env";
import * as secureStorage from "expo-secure-store";
import { onMessageReceiveCallback } from "../types/General";
import { IReport } from "../types/Models/Report";

type emitSendMessageArgs = {
  receiverID: string;
  forwardedReport?: IReport;
  message: string;
};

let socket: Socket = null;

const getSocket = async () => {
  const token = await secureStorage.getItemAsync("jwt");
  
  return new Promise<Socket>((resolve, reject) => {
    if (socket) {
      socket.connect();
      console.log("Socket connected");
      resolve(socket);
    } else {
      socket = io(`${api_url}`, {
        auth: { token: token },
        reconnection: true,
        reconnectionDelay: 200,
        reconnectionDelayMax: 200,
        reconnectionAttempts: Infinity,
      });
      console.log("New socket created");

      socket.on("connect", () => {
        console.log("Socket connected");
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
        console.log(reason + " Socket disconnected");
      });
    }
  });
};

export function sendMessage({ receiverID, message, forwardedReport }: emitSendMessageArgs) {
  if (!socket) throw new Error("Socket not initialized");
  socket.emit("sendMessage", receiverID, { message, forwardedReport }, (ack) => {
    console.log("ack", ack);
  });
}

export function getPendingMessages() {
  socket.emit("getPendingMessages");
}

export function addOnMessageReceiveListener(callBack: onMessageReceiveCallback) {
  console.log("Add on message receive listener");

  return new Promise((resolve, reject) => {
    try {
      resolve(
        socket.on("receiveMessage", (...args) => {
          const [senderID, message] = args;
          console.log("Message received", args);
          callBack({ senderID: senderID, message: message.message, forwardedReport: message.forwardedReport });
        })
      );
    } catch (err) {
      reject(err);
    }
  });
}

export function disconnectSocket() {
  socket.disconnect();
  socket.removeAllListeners();
  socket = null;
  console.log("Socket disconnected", socket);
}

export default getSocket;
