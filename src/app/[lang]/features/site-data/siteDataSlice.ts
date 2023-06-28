import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosRequest} from "../../../../../utils/baseUrl";

const makeRequest = axiosRequest();

type SiteDataType = {
    loading: boolean | null;
    currencyRates: any;
    error: any
}
export const getExchangeRates = createAsyncThunk('currency/check', async () => {
    const response = await fetch(
        'https://openexchangerates.org/api/latest.json?app_id=46b57b28c8b647089f29b3908615addc'
    );
    const data = await response.json();
    console.log(data);
    return data;
});

const initialState: SiteDataType = {
    loading: null,
    currencyRates: null,
    error: null
}

const siteDataSlice = createSlice({
    name: 'siteData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExchangeRates.pending, (state) => {
                state.loading = true;
                state.currencyRates = null;
                state.error = null
            })
            .addCase(getExchangeRates.fulfilled, (state, action) => {
                console.log(action, state)
                state.loading = false;
                state.currencyRates = action.payload;
                state.error = null;
            })
            .addCase(getExchangeRates.rejected, (state, action) => {
                state.loading = false;
                state.currencyRates = null;
                state.error = action.error.message;
            });
    },
});
export default siteDataSlice.reducer;
