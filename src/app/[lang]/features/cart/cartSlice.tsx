import {createSlice} from "@reduxjs/toolkit";
import {Product} from "../product/product";

interface CartState {
    totalCount: number;
    totalAmount: number;
    cartItems: Product [];
    error: string | null;
}

const initialState: CartState = {
    totalCount: 0,
    totalAmount: 0,
    cartItems: [],
    error: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calSubTotal: (state, action) => {
            state.totalAmount += action.payload
        },

        addProduct: (state, action) => {
            const product = action.payload
            state.totalCount += product.count

            if (!product.discount) {
                state.totalAmount += product.unit_price;
            } else {
                state.totalAmount += (product.unit_price - (product.unit_price * (product.discount / 100)));
            }

            let newCart
            const existingProduct = state.cartItems.findIndex((item) => item._id === product._id)
            if (existingProduct > -1) {
                newCart = state.cartItems.map((item) => {
                    if (item._id === product._id) {
                        item.count += product.count
                    }
                    return item
                })
            } else {
                newCart = [...state.cartItems, product]
            }

            state.cartItems = newCart
            localStorage.setItem("cartItems", JSON.stringify(newCart))
        },

        removeProduct: (state, action) => {
            const product = action.payload
            state.totalCount -= product.count

            if (!product.discount) {
                state.totalAmount -= product.count * product.unit_price;
            } else {
                state.totalAmount -= product.count * (product.unit_price - (product.unit_price * (product.discount / 100)));
            }

            let newCart
            const existingProduct = state.cartItems.findIndex((item) => item._id === product._id)
            if (existingProduct > -1) {
                newCart = state.cartItems.map((item) => {
                    if (item._id === product._id) {
                        item.count -= product.count
                    }
                    return item
                }).filter((item) => item.count > 0)

            } else {
                newCart = [...state.cartItems, product]
            }

            state.cartItems = newCart
            localStorage.setItem("cartItems", JSON.stringify(newCart))
        },

        resetProduct: (state) => {
            state.totalAmount = 0
            state.totalCount = 0
            state.cartItems = []
            localStorage.removeItem("cartItems")
        },

        setCart: (state, action) => {
            state.totalAmount = action.payload.totalAmount
            state.totalCount = action.payload.totalCount
            state.cartItems = action.payload.cartItems
        },

    },

});

export const {
    calSubTotal,
    addProduct,
    removeProduct,
    setCart,
    resetProduct
} = cartSlice.actions;

export default cartSlice.reducer;
