import { createSlice } from "@reduxjs/toolkit";
import IComplainant from "../types/Models/Complainant";



type initialState = {
    complainants: IComplainant[],
    loading: boolean,
    error: string | null,
    profilePictureFetched: boolean,
}


const complainantSlice = createSlice({
    initialState: {
        complainants: [],
        loading: false,
        error: null,
    } as initialState,
    name: "complainant",
    reducers: {
        startAction: (state) => {
            state.loading = true
            state.error = null
        },
        fetchComplainantsSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.complainants = action.payload
        },
        fetchComplainantsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateComplainantSuccess: (state, action) => {
            state.loading = false
            state.error = null
            const complainantID = action.payload
            const complainantIndex = state.complainants.findIndex(comp => comp._id === complainantID)
            state.complainants[complainantIndex] = { ...state.complainants[complainantIndex], activation: !state.complainants[complainantIndex].activation }
        },
        updateComplainantError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteComplainantSuccess: (state, action) => {
            state.loading = false
            state.error = null
            const complainantID = action.payload
            const complainantIndex = state.complainants.findIndex(comp => comp._id === complainantID)
            state.complainants.splice(complainantIndex, 1)
        },
        deleteComplainantError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        fectchProfilePictureSuccess: (state, action) => {
            state.loading = false
            state.error = null
            const complainantID = action.payload.id
            const complainantIndex = state.complainants.findIndex(comp => comp._id === complainantID)
            state.complainants[complainantIndex] = { ...state.complainants[complainantIndex], base64ProfilePicture: action.payload.base64ProfilePicture}
        },
        fetchProfilePictureError: (state, action) => {
            state.loading = false
            state.error =action.payload 
        }
    }

})

export const {
    startAction,
    fetchComplainantsSuccess,
    fetchComplainantsError,
    updateComplainantSuccess,
    updateComplainantError,
    fectchProfilePictureSuccess,
    fetchProfilePictureError,
    deleteComplainantSuccess,
    deleteComplainantError

} = complainantSlice.actions
export default complainantSlice.reducer;