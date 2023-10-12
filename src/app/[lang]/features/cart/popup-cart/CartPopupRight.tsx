import React from 'react'
import { IoClose } from 'react-icons/io5'
import Image from "next/image";
import product from "../../../assets/product/product.jpg";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import cart from "../../../../../../assets/cart/Untitled.jpg";
import { useEffect, useState } from "react";
import { RootState } from "@/app/[lang]/redux/store";
import { calSubTotal } from "@/app/[lang]/features/cart/cartSlice";
import CartPopupCard from "@/app/[lang]/features/cart/popup-cart/CartPopupCard";
import { Product } from "../../product/product";
import { useSearchParams } from "next/navigation";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import Draggable from 'react-draggable';

const CartPopupRight = () => {
    const { getPrice } = useCurrency();
    const { cartItems, cartAmount, removeProductFromCart } = useCartItemsHook()

    const handleClose = () => {

    };
    return (
        <>
            <Draggable>
                <div
                    style={{
                        position:'absolute',
                        right: '0',
                        marginTop: '72px',
                        width: '64px',
                        minHeight: '400px',
                        zIndex: '1000',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        cursor: 'move', // Set cursor to indicate draggability
                    }}
                >
                   aaaaaaaaaaaaaaaaaaaaa
                </div>
            </Draggable>
        </>
    )
}

export default CartPopupRight
