import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {Product} from "@/app/[lang]/features/product/product";
import {addProduct, removeProduct, setCart} from "@/app/[lang]/features/cart/cartSlice";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";

const UseCartItemsHook = () => {
    const [cartItems, setCartItems] = useState<Product []>([])
    const [cartCount, setCartCount] = useState(0)
    const [cartAmount, setCartAmount] = useState(0)
    const cartState = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>()
    const axios = axiosRequest();

    useEffect(() => {
        const cart = cartState.cartItems || []

        if (cart.length === 0) {

            fetchCart()

        } else {
            const cartItemsState = cartState.cartItems
            const {cartAmountCalculated, cartCountCalculated} = calCartDetails(cartItemsState)
            setCartItems(cartItemsState)
            setCartAmount(cartAmountCalculated)
            setCartCount(cartCountCalculated)
        }
    }, [cartState.cartItems, dispatch])

    const getCartItems = async (cartItemsAr: Product[]) => {
        console.log("getCartItems", cartItemsAr)
        return axios({
            url: `${baseUrl}/catelog/item/find-list`,
            data: {items: cartItemsAr.map((i: any) => i._id)},
            method: "post",
        })

    }

    const calCartDetails = (cartItems: Product[]) => {
        let cartAmountCalculated = 0
        let cartCountCalculated = 0
        cartItems.forEach((item) => {
            cartCountCalculated += item.count
            if (!item.discount) {
                cartAmountCalculated += item.count * item.unit_price;
            } else {
                cartAmountCalculated += item.count * (item.unit_price - (item.unit_price * (item.discount / 100)));
            }
        })
        return {cartAmountCalculated, cartCountCalculated}
    }
    const addProductToCart = (product: Product) => {
        dispatch(addProduct(product))
    }

    const removeProductFromCart = (product: Product) => {
        dispatch(removeProduct(product))
    }

    const fetchCart = () => {
        const localCart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : []

        if (localCart.length > 0) {

            getCartItems(localCart).then((data) => {
                const fetchedCartItems = data.map((item: Product) => {
                    const itemInCart: any = localCart.find((p: Product) => p._id === item._id);
                    if (itemInCart) {
                        return {...item, count: itemInCart.count || 0};
                    }
                    return item;
                });

                if (fetchedCartItems.length > 0) {
                    const {cartAmountCalculated, cartCountCalculated} = calCartDetails(fetchedCartItems)
                    dispatch(setCart({
                        totalAmount: cartAmountCalculated,
                        totalCount: cartCountCalculated,
                        cartItems: fetchedCartItems
                    }))
                } else {
                    setCartItems([])
                    setCartAmount(0)
                    setCartCount(0)
                }

            }).catch((error) => {
                console.error("error : ", error);
            });

        } else {
            setCartItems([])
            setCartAmount(0)
            setCartCount(0)
        }
    }
    // console.log("render", {cartItems, cartCount, cartAmount, addProductToCart, removeProductFromCart})

    return {cartItems, cartCount, cartAmount, addProductToCart, removeProductFromCart, fetchCart}
};

export default UseCartItemsHook;