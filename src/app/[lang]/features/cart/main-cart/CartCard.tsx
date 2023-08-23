"use client"
import { Product } from "@/app/[lang]/features/product/product";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import AddCartButton from "./AddCartButton";

const CartCard = ({ item, index, handleDecrement, handleIncrement, handleDelete, price, newPrice, subTotal, count }: any) => {

    const isQuantityEqualToCount = item.quantity === count;
    console.log(item)
    return (
        <div
            className={`grid grid-cols-4 sm:grid-cols-12 grid-2 gap-1 border-b py-3 h-28 items-center relative ${item.expired ? 'bg-gray-300' : ''}`}
            key={index}
        >
            <div className="h-[95px] sm:col-span-2">
                <Image
                    src={item.product_image}
                    alt="item1"
                    style={{
                        objectFit: "contain",
                        backgroundColor: "#e5e7eb",
                        width: "100%",
                        height: "100%",
                    }}
                    width={450}
                    height={400}
                />
            </div>
            <div className="sm:col-span-2 col-span-1 text-sm  ">
                <p className="text-sm ">{item.product_name}</p>
                {item.expired && (
                    <p className="text-sm ">expire</p>
                )}
            </div>
           
            <div className="hidden sm:block text-gray-400 text-sm line-through mr-2 my-1 font-[1.125rem]">{price}</div>
            <div className="col-span-1">{newPrice}</div>
            <div className={`flex sm:col-span-2 ${item.expired ? 'pointer-events-none cursor-not-allowed' : ''}`}>
                <button
                    className="p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center"
                    onClick={() => handleDecrement(item)}
                >
                    <FaMinus className="text-xs" />
                </button>
                <p className="text-sm flex items-center justify-center w-7 mx-1">
                    {count}
                </p>
                <button
                    className={`p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center ${isQuantityEqualToCount ? 'pointer-events-none cursor-not-allowed' : ''}`}
                    onClick={() => handleIncrement(item)}
                >
                    <FaPlus className="text-xs " />
                </button>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-sm  ">
                {item.quantity}
            </div>
            <div className="col-span-2 hidden sm:block">{subTotal}</div>
            <div className="col-span-1 hidden sm:block">
                <div className="flex">
                    <button
                        className="bg-[#e5e7eb] rounded-full p-1"
                        onClick={() => handleDelete(item)}
                    >
                        <IoCloseSharp className="text-xl font-semibold text-black" />
                    </button>
                    <AddCartButton  product={...item}/>
                </div>


            </div>
        </div>
    );
};

export default CartCard;
