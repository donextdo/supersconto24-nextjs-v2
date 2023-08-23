import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import cartProductReducer from "../features/cart/cartProductSlice";
import orderSlice from "@/app/[lang]/components/Checkout/orderSlice";
import authReducer from "@/app/[lang]/features/auth/authSlice";
import siteDataReducer from "@/app/[lang]/features/site-data/siteDataSlice";
import flyerReducer from "../components/MainFlyer/FlyerSlice";
// import userReducer from "../features/User/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    cartProducts: cartProductReducer,
    order: orderSlice,
    auth: authReducer,
    flyer: flyerReducer,
    siteData: siteDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
