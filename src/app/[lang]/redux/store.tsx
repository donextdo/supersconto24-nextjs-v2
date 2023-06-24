import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderSlice from "@/app/[lang]/components/Checkout/orderSlice";
import authReducer from "@/app/[lang]/features/auth/authSlice";
// import userReducer from "../features/User/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderSlice,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
