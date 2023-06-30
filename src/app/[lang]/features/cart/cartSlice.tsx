import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../product/product";
// import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
// import { http } from "../../../utils/request";

interface CartState {
  
  totalCount: number;
  totalAmount: number;
 
  error: string | null;
}

const initialState: CartState = {
  
  totalCount: 0,
  totalAmount: 0,
  
  error: null,
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    calSubTotal: (state, action) => {
      // console.log('Order inserted:', action.payload);
      state.totalAmount += action.payload 
      
    },
    addProduct: (state, action) => {
      
      state.totalAmount += action.payload.price
      state.totalCount += action.payload.count

      
    },
    removeProduct: (state, action) => {
      
      state.totalAmount -= action.payload.price
      state.totalCount -= action.payload.count
      
      
    },

    resetProduct: (state, action) => {
      
      state.totalAmount = 0
      state.totalCount = 0
      
      
    },
    
  },
  
});

export const {
  
  calSubTotal,
  resetProduct,
  removeProduct,
  addProduct

} = cartSlice.actions;

export default cartSlice.reducer;
