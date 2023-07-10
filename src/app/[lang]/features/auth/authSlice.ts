import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";
import axios from 'axios';

const makeRequest = axiosRequest();

type AuthStateType = {
    loading: boolean | null;
    currentUser: any;
    error: any
}
export type UserType = {
    email: string;
    fullName: string;
    picture: {
        srcName: string;
        name: string;
        src: string;
    };
    role: 'CUSTOMER';
    status: 1;
};

export type AuthType = {
    email: string;
    password: string;
};
export const socialAuth = createAsyncThunk('auth/social', async (payload: UserType) => {
    // return await makeRequest({url: `${baseUrl}/auth/social`, data: payload, method: "post"})
    return await axios.post(`${baseUrl}/auth/social`,payload)
});

export const generalAuth = createAsyncThunk('auth/general', async (payload: AuthType) => {
    // return await makeRequest({url: `${baseUrl}/users/login`, data: payload, method: "post"})
    return await axios.post(`${baseUrl}/users/login`,payload)

});

const initialState: AuthStateType = {
    loading: null,
    currentUser: null,
    error: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null
        },
        logOut: (state) => {
            state.loading = true;
            state.currentUser = null;
            state.error = null
            localStorage.removeItem("userData")
        }},
    extraReducers: (builder) => {
        builder
            .addCase(socialAuth.pending, (state) => {
                state.loading = true;
                state.currentUser = null;
                state.error = null

                localStorage.removeItem("userData")
            })
            .addCase(socialAuth.fulfilled, (state, action) => {
                console.log(action, state)
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;

                localStorage.setItem("userData", btoa(JSON.stringify(action.payload)))
            })
            .addCase(socialAuth.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.error = action.error.message;

                localStorage.removeItem("userData")
            })
            .addCase(generalAuth.pending, (state) => {
                state.loading = true;
                state.currentUser = null;
                state.error = null

                localStorage.removeItem("userData")
            })
            .addCase(generalAuth.fulfilled, (state, action) => {
                console.log(action, state)
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;

                localStorage.setItem("userData", btoa(JSON.stringify(action.payload)))
            })
            .addCase(generalAuth.rejected, (state, action) => {
                console.log("generalAuth.rejected")
                state.loading = false;
                state.currentUser = null;
                state.error = action.error.message;

                localStorage.removeItem("userData")
            });
    },
});

export const {logOut, setAuthUser} = authSlice.actions
export default authSlice.reducer;