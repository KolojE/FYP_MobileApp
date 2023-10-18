import { createSlice } from "@reduxjs/toolkit";
import IUser from "../types/Models/User";


type initialState= {
    loggedInUser: IUser,
    loading: boolean,
    error: string | null,
        
} 

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loggedInUser: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {
      loginStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginSuccess: (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
        state.error = null;
      },
      loginFailure: (state, action) => {
        state.loggedInUser = null;
        state.loading = false;
        state.error = action.payload;
      },
      loginError: (state, action) => {
        state.loggedInUser = null;
        state.loading = false;
        state.error = action.payload;
      },
      logout: (state) => {
        state.loggedInUser = null;
      },
    },
  });

export const { loginStart, loginSuccess, loginFailure,loginError, logout } =loginSlice.actions;
export default loginSlice.reducer