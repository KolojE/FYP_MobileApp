import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types/General";

type initialState = {
    userinfo: UserInfo,
    loading: boolean,
    error: string | null,
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userinfo: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {
        fetchUserInfoStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserInfoSuccess: (state, action) => {
            state.userinfo = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchUserInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        uploadProfilePictureStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        uploadProfilePictureSuccess: (state, action) => {
                        state.userinfo.user.base64ProfilePicture = action.payload;
            state.loading = false;
            state.error = null;
        },
        uploadProfilePictureFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserInfoStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateUserInfoSuccess: (state, action) => {
                        state.userinfo.user = {...state.userinfo.user, ...action.payload};
            state.loading = false;
            state.error = null;
        },
        updateUserInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOrganizationInfoStart:(state) =>{
            state.loading=true;
            state.error=null;
        },
        updateOrganizationInfoSuccess:(state,action) =>{
            state.userinfo.organization=action.payload.organization
            state.userinfo.statuses=action.payload.statuses
            state.loading=false;
            state.error=null;
        },
        updateOrganizationInfoFailure:(state,action) =>{
            state.error=action.payload;
        }

    }

}

)

export default userSlice.reducer
export const {
    fetchUserInfoStart,
    fetchUserInfoSuccess,
    fetchUserInfoFailure,
    uploadProfilePictureFailure,
    uploadProfilePictureStart,
    uploadProfilePictureSuccess,
    updateUserInfoFailure ,
    updateUserInfoStart,
    updateUserInfoSuccess ,
    updateOrganizationInfoFailure,
    updateOrganizationInfoStart,
    updateOrganizationInfoSuccess,
 } = userSlice.actions;
