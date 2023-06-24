import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {boolean} from "zod";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";

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
export const socialAuth = createAsyncThunk('auth/check', async (payload: UserType) => {
    const response = await makeRequest({url:`${baseUrl}/auth/social`, data:payload, method:"post"});
    console.log(response)
    return response
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
            });
    },
});

export const {logOut} = authSlice.actions
export default authSlice.reducer;
