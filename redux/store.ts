import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication";
import registrationReducer from "./registration";
import userinfoReducer from "./userinfo";
import socketReducer from "./socket";
import chatReducer from "./chat";
import reportReducer from "./report";
import complainantReducer from "./complainant";
const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        registration: registrationReducer,
        userinfo: userinfoReducer,
        socket: socketReducer,
        chat: chatReducer,
        report: reportReducer,
        complainant: complainantReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;

