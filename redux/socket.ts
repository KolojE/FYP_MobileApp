import { createSlice } from "@reduxjs/toolkit";
import { onMessageReceiveCallback } from "../types/General";


type initialState = {
    onMessageReceive: (callBack: onMessageReceiveCallback) => void,
    connected: boolean,
    loading: boolean,
    error: string | null,
}

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        connected: false,
        loading: false,
        error: null,
    } as initialState,
    reducers:{
        socketStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        socketSuccess: (state) => {
            state.connected = true;
            state.loading = false;
            state.error = null; 
        },
        socketFailure: (state, action) => {
            state.connected = false;
            state.loading = false;
            state.error = action.payload;
        },
        socketDisconnect: (state) => {
            state.connected = false;
            state.loading = false;
            state.error = null;
        }
    }
})

export const { socketStart, socketSuccess, socketFailure ,socketDisconnect} = socketSlice.actions
export default socketSlice.reducer;