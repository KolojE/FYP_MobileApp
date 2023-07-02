import { createSlice } from "@reduxjs/toolkit"
import { IReport } from "../types/Models/Report"

type chats = {
    [key: string]: {
        chatLog: {
            msg: string,
            forwardedReport?: IReport,
            receive?: boolean
        }[],
        unRead: boolean
    }
}

type initialState = {
    loading: boolean,
    error: string | null,
    chat: chats

}

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        error: null,
        chat: {}
    } as initialState,
    reducers: {
        startSendingMessage: (state) => {
            state.loading = true
            state.error = null
        },
        addMessage: (state, action) => {
            const { receiverID, msg, receive,forwardedReport } = action.payload
            if (!state.chat[receiverID]) {
                state.chat[receiverID] = {
                    chatLog: [{ msg, receive,forwardedReport}]
                    , unRead: true
                }
            }
            else {
                state.chat[receiverID].chatLog.push({ msg, receive,forwardedReport  })
                state.chat[receiverID].unRead = true
            }
        },
        sendMessageError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        receiveMessageError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        receiveMessageSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        readMessage: (state, action) => {
            const { receiverID } = action.payload
            state.chat[receiverID].unRead = false
        },
        retrieveAllChat: (state, action) => {
            state.chat = action.payload

        }
    }

})

export const { 
    startSendingMessage,
    addMessage,
    sendMessageError,
    receiveMessageError,
    receiveMessageSuccess,
    readMessage,
    retrieveAllChat
 } = chatSlice.actions
export default chatSlice.reducer;