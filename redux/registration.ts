import { createSlice } from "@reduxjs/toolkit";
import IUser from "../types/Models/User";

type initialState = {
    loggedInUser: IUser,
    registrationSuccess: boolean,
    loading: boolean,
    error: string | null,
}


export const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        loggedInUser: null,
        registrationSuccess: false,
        loading: false,
    } as initialState,
    reducers: {
        registrationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registrationSuccess: (state, action) => {
            state.loggedInUser = action.payload;
            state.loading = false;
            state.error = null;
            state.registrationSuccess = true;
        },
        registrationFailure: (state, action) => {
            state.loggedInUser = null;
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { registrationStart, registrationSuccess, registrationFailure } = registrationSlice.actions;
export default registrationSlice.reducer