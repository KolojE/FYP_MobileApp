import { createSlice } from "@reduxjs/toolkit"

type initialState = {
    loading: boolean,
    error: string | null,
    chat: {
        [key: string]: {
            chatLog: {
                msg: string,
                receive?: boolean
            }[],
            unRead: boolean
        }
    },

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
            const { receiverID, msg, receive } = action.payload
            if (!state.chat[receiverID]) {
                state.chat[receiverID] = {
                    chatLog: [{ msg, receive }]
                    , unRead: true
                }
            }
            else {
                state.chat[receiverID].chatLog.push({ msg, receive })
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
        }
    }

})

export const { startSendingMessage, addMessage, sendMessageError, receiveMessageError, receiveMessageSuccess,readMessage } = chatSlice.actions
export default chatSlice.reducer;