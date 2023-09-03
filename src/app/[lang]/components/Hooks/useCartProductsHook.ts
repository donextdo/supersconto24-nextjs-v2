import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {Product} from "@/app/[lang]/features/product/product";
import {addProduct, removeProduct, setCart} from "@/app/[lang]/features/cart/cartProductSlice";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";

const UseCartProductHook = () => {
    const [cartProducts, setCartItems] = useState<Product []>([])
    const [cartProductsCount, setCartCount] = useState(0)
    const [cartProductsAmount, setCartAmount] = useState(0)
    const cartState = useSelector((state: RootState) => state.cartProducts);
    const dispatch = useDispatch<AppDispatch>()
    const axios = axiosRequest();

    useEffect(() => {
        const cart = cartState.cartItems || []

        if (cart.length === 0) {

            fetchCartProduct()

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

            if (!item.expired){
                if (!item.discount) {
                    cartAmountCalculated += item.count * item.unit_price;
                } else {
                    cartAmountCalculated += item.count * (item.unit_price - (item.unit_price * (item.discount / 100)));
                }
            }
        })
        return {cartAmountCalculated, cartCountCalculated}
    }
    const addCartProductsToCart = (product: Product) => {
        dispatch(addProduct(product))
    }

    const removeCartProductFromCart = (product: Product) => {
        dispatch(removeProduct(product))
    }

    const fetchCartProduct = () => {
        const localCart = localStorage.getItem("cartProducts") ? JSON.parse(localStorage.getItem("cartProducts")!) : []

        if (localCart.length > 0) {

            getCartItems(localCart).then((data) => {
                const fetchedCartItems = data.map((item: Product) => {
                    const itemInCart: any = localCart.find((p: Product) => p._id === item._id);
                    if (itemInCart) {
                        const expireDate = new Date(item?.catelog_book_id?.expiredate);
                        const currentDate = new Date();
                        const expired = currentDate > expireDate;
                        return {...item, count: itemInCart.count || 0, expired};
                    }
                    return item;
                });

                if (fetchedCartItems.length > 0) {
                    dispatch(setCart({
                        cartItems: fetchedCartItems
                    }))
                } else {
                    setCartItems([])
                    setCartAmount(0)
                    setCartCount(0)
                }

                console.log({fetchedCartItems});

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

    return {cartProducts, cartProductsCount, cartProductsAmount, addCartProductsToCart, removeCartProductFromCart, fetchCartProduct}
};

export default UseCartProductHook;