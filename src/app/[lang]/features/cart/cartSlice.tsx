import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../product/product";
// import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
// import { http } from "../../../utils/request";

interface CartState {
  items: Product[];
  totalCount: number;
  totalAmount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalCount: 0,
  totalAmount: 0,
  status: "idle",
  error: null,
};
// const PRODUCTS_URL = `${baseUrl}/orders/place`;

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  // const response = await axios.post(PRODUCTS_URL);
  // return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      console.log(action.payload)
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex === -1) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        state.items[itemIndex].count++;
      }
      localStorage.setItem("myItems",JSON.stringify(state.items))

      state.totalCount++;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        const count = state.items[itemIndex].count;
        state.items.splice(itemIndex, 1);
        state.totalCount -= count;
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ itemId: string; count: number }>
    ) => {
      const item = state.items.find(
        (item) => item._id === action.payload.itemId
      );
      if (item) {
        const countDiff = action.payload.count - item.count;
        item.count = action.payload.count;
        state.totalCount += countDiff;
      }
    },
    removeAll: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalAmount = 0;
    },
    calSubTotal: (state, action) => {
      // console.log('Order inserted:', action.payload);
      state.totalAmount = action.payload 
      
    },
    getDataFrom: (state) => {
      const items = localStorage.getItem("myItems") ? JSON.parse(localStorage.getItem("myItems")?? "") : [];

      state.items = items
      state.totalCount = items.length ?? 0;
      state.totalAmount = 0;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCart.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchCart.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.items = action.payload;
  //     })
  //     .addCase(fetchCart.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message ?? "Unknown error";
  //     });
  // },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  removeAll,
  calSubTotal,
    getDataFrom
} = cartSlice.actions;

export default cartSlice.reducer;
