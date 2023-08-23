import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {Product} from "@/app/[lang]/features/product/product";
import {addProduct, removeProduct, setCart} from "@/app/[lang]/features/cart/cartSlice";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";

const useCartProductsHook = () => {
    const [cartItems, setCartItems] = useState<Product []>([])
    const [cartCount, setCartCount] = useState(0)
    const [cartAmount, setCartAmount] = useState(0)
    const cartState = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>()
    const axios = axiosRequest();

    useEffect(() => {
        fetchCart()
       
    }, [])

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
    

    const fetchCart = () => {
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

    return {cartItems, cartCount, cartAmount, fetchCart}
};

export default useCartProductsHook;