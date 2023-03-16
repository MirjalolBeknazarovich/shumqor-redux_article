/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistanceStoreg";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true
        },
        signUserSuccess: ( state, action ) => {
            state.isLoading = false,
            state.loggedIn = true,
            state.user = action.payload
            setItem( 'token', action.payload.token )
        },
        signUserFailer: ( state, action ) => {
            state.isLoading = false,
            state.error = action.payload.errors
        },
        logoutUser: state => {
            state.user = null
            state.loggedIn = false
        }
    }
})

export const { signUserStart, signUserSuccess, signUserFailer, logoutUser } = authSlice.actions
export default authSlice.reducer