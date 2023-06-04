import { createSlice } from "@reduxjs/toolkit";
import { onMessageReceiveCallback } from "../types/General";


type initialState = {
    onMessageReceive: (callBack: onMessageReceiveCallback) => void,
    loading: boolean,
    error: string | null,
}

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        loading: false,
        error: null,
    } as initialState,
    reducers:{
        socketStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        socketSuccess: (state) => {
            state.loading = false;
            state.error = null; 
        },
        socketFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        socketDisconnect: (state) => {
            state.loading = false;
            state.error = null;
        }
    }
})

export const { socketStart, socketSuccess, socketFailure ,socketDisconnect} = socketSlice.actions
export default socketSlice.reducer;