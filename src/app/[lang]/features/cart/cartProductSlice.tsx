import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../product/product";

interface CartState {
    cartItems: Product [];
    error: string | null;
}

const initialState: CartState = {
    cartItems: [],
    error: null,
};

export const cartProductSlice = createSlice({
    name: "cartProduct",
    initialState,
    reducers: {

        addProduct: (state, action) => {
            const product = action.payload

            let newCart
            const existingProduct = state.cartItems.findIndex((item) => item._id === product._id)
            if (existingProduct > -1) {
                newCart = state.cartItems.map((item) => {
                    if (item._id === product._id) {
                        item.count = product.count
                    }
                    return item
                })
            } else {
                newCart = [...state.cartItems, product]
            }

            state.cartItems = newCart
            localStorage.setItem("cartProducts", JSON.stringify(newCart))
        },

        removeProduct: (state, action) => {
            const product = action.payload

            const newCart = state.cartItems.filter((item) => item._id !== product._id)

            state.cartItems = newCart
            localStorage.setItem("cartProducts", JSON.stringify(newCart))
        },

        resetProduct: (state, action) => {
            state.cartItems = []
            localStorage.removeItem("cartProducts")
        },

        setCart: (state, action) => {
            state.cartItems = action.payload.cartItems
        },

    },

});

export const {
    addProduct,
    removeProduct,
    setCart,
    resetProduct
} = cartProductSlice.actions;

export default cartProductSlice.reducer;
