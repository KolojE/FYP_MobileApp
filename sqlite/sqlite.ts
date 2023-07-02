import * as SQLite from 'expo-sqlite';
import { IReport } from '../types/Models/Report';

const db = SQLite.openDatabase('chat.db');

type insertMessageArgs = {
  chatId: string,
  message: string,
  receive: boolean,
  forwardedReport?:IReport
}

export const chatDBInit= () => {

   db.transaction(tx => {
  tx.executeSql(`
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chatId TEXT NOT NULL,
      message TEXT NOT NULL,
      receive INTEGER NOT NULL
    )
  `);
});

// Insert a chat message into the database
const insertMessage = ({chatId,message,receive,forwardedReport}:insertMessageArgs) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO chats (chatId, message, receive,forwardedReport) VALUES (?, ?, ?)', [chatId, message, receive.toString(),JSON.stringify(forwardedReport)]);
  });
};

// Retrieve all chat messages for a specific chat from the database
 const getAllMessages = (chatId, callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM chats WHERE chatId = ?', [chatId], (_, { rows }) => {
      callback(rows._array);
    });
  });
 };

  const getAllChats = (callback) => {
     db.transaction(tx => {
      tx.executeSql('SELECT * FROM chats', [], (_, { rows }) => {
        callback(rows._array);
      });})
  }

  const dropTable = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE chats', [], (_, { rows }) => {
        console.log("drop table")
      });})
  }


    return { insertMessage, getAllMessages,getAllChats,dropTable}
};
