import Image from "next/image";
import product from "../../../assets/product/product.jpg";
import { IoClose } from "react-icons/io5";
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
import Draggable from "react-draggable";

const CartPopup = ({ setCart }: any) => {
    const { getPrice } = useCurrency();
    const { cartItems, cartAmount, removeProductFromCart } = useCartItemsHook()

    const handleClosePopup = () => {
        setCart(false)
        console.log("close")
    }

    return (
        <>
            <Draggable>
                {cartItems.length > 0 ? (
                    <div className="absolute w-[300px] max-h-[540px] bg-white right-0 z-50 px-5 py-4 shadow-lg mt-4">
                        <div className="absolute top-2 right-5">
                            <button
                                onClick={handleClosePopup}
                                className="bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
                            >
                                <IoClose className="text-white" />
                            </button>
                        </div>
                        <div className="max-h-[260px] overflow-y-auto overflow-x-hidden mt-4">
                            {cartItems.map((item: any, index: number) => (
                                <CartPopupCard
                                    getPrice={getPrice}
                                    item={item}
                                    key={index}
                                    handleRemove={() => { removeProductFromCart(item) }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 mb-4">
                            <p className="text-[#c2c2d3] font-semibold text-[13px]">
                                Subtotal:
                            </p>
                            <p className="text-lg text-[#ed174a]">{getPrice(cartAmount)}</p>
                        </div>

                        <Link href="/viewcart">
                            <button className="bg-white border py-2 rounded-md text-sm h-[50px] w-full text-center">
                                View list
                            </button>
                        </Link>
                        <Link href="/checkout">
                            <button
                                className="bg-primary text-white py-2 rounded-md text-sm h-[50px] w-full text-center mt-1">
                                Checkout
                            </button>
                        </Link>
                        <hr className="mt-3" />
                        {/* <p className="text-xs text-center text-[#3e445a] mt-4">
          We reduce shipping prices to only 2.49 €!
        </p> */}
                    </div>
                ) : (
                    <div
                        className="absolute w-[300px] max-h-[540px] min-h-[220px] bg-white right-0 z-50 px-5 py-4 shadow-lg">
                             <div className="absolute top-2 right-5">
                            <button
                                onClick={handleClosePopup}
                                className="bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
                            >
                                <IoClose className="text-white" />
                            </button>
                        </div>
                        <div className="h-[160px] sm:col-span-2">
                            <Image
                                src={cart}
                                alt="item1"
                                style={{
                                    objectFit: "contain",
                                    backgroundColor: "white",
                                    width: "100%",
                                    height: "100%",
                                }}
                                width={450}
                                height={400}
                            />
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default CartPopup;
