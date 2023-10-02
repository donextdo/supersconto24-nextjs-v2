'use client'
import { SearchItem } from "../Search/Search";
import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import Link from "next/link";
import { BsCart4, BsList } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../../../assets/logo/logo.png";
// import getConfig from "next/config";
import { Location } from "../Location/Location";
// import SideNavBar from "../SideNavBar/SideNavbar";
import React, { JSXElementConstructor, ReactElement, ReactFragment, useState } from "react";
import CartPopup from "@/app/[lang]/features/cart/popup-cart/CartPopup";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import { BiCurrentLocation } from "react-icons/bi";
import { updateParamValue } from "../../../../../utils/baseUrl";
import { useRouter } from "next/navigation";
import SideNavBar from "../SideNavBar/SideNavBar";
import useAuthCheckHook from "../Hooks/useAuthCheck";
import CartPopupRight from "../../features/cart/popup-cart/CartPopupRight";
import Draggable from "react-draggable";
import { FaLocationArrow } from "react-icons/fa";
import cartsvg from '../../../../../assets/cart/cartsvg.svg'

const Header = () => {
    const [cart, setCart] = useState(false);
    const [showSideNavbar, setShowSideNavbar] = useState(false)
    const { getPrice } = useCurrency()
    const { cartCount, cartAmount } = useCartItemsHook()
    const router = useRouter()
    const { isLoggedIn, authUser, logOut } = useAuthCheckHook()


    let email: string | null;
    let username;
    let extractedUsername: any

    // review name
    if (authUser) {
        if (authUser?.email !== null) {
            username = authUser?.email.split("@")[0]; // Extract the username from the email
            extractedUsername = username.replace(/"/g, "");
        } else {
            // Handle the case when the email value is null
        }
    } else {
        // Handle the case when the value is null
        // For example, you could set a default value
    }
    let initials = extractedUsername?.charAt(0).toUpperCase()
    const handleClick = () => {
        // setCart(!cart)
    };
    const handleEnter = () => {
        setCart(true);
    };
    const handleLeave = () => {
        setCart(false);
    };
    const handleCart = () => {
        setCart(true);

    };
    const handleSideNavbar = () => {
        setShowSideNavbar(!showSideNavbar);
    };

    function getMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const data = [
                    { key: 'lat', value: coords.latitude },
                    { key: 'long', value: coords.longitude },
                ];
                router.push(updateParamValue(data), { shallow: false })
            });
        }
    }

    // console.log("da", authUser)
    return (
        <>
            <div className="hidden lg:block  px-5 sticky top-0 z-40 bg-[#E4E4E4]">
                <div className=" flex items-center py-2 w-full">
                    <div>
                        <button className="text-3xl" onClick={handleSideNavbar}>
                            <BsList />
                        </button>
                        {showSideNavbar && (
                            <SideNavBar setShowSideNavbar={setShowSideNavbar} handleSideNavbar={handleSideNavbar} />
                        )}
                    </div>

                    <div className="text-4xl font-bold text-[#223994] flex justify-start ml-4">
                        <Link href="/">
                            <div className="h-[69px] w-[150px] xl:w-[216px] ">
                                <Image
                                    src={logo}
                                    alt="item1"
                                    style={{
                                        objectFit: "contain",

                                        width: "100%",
                                        height: "100%",
                                    }}
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mx-4 xl:mx-20">
                        <div className="flex w-full">
                            <div className="flex justify-start items-center w-full">
                                <Location />
                            </div>
                            <div className="flex justify-center items-center font-semibold ">
                                <div className="">
                                    <a onClick={() => getMyLocation()}>
                                        <button className="h-[60px] bg-red-600 px-8 rounded-r-md">
                                            <FaLocationArrow className="text-lg text-white " />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="search-bar">
                            <SearchItem />
                        </div>
                    </div>

                    <div className="flex justify-end ">
                        <div className=" flex justify-end items-center font-semibold">
                            {authUser?._id ? (
                                <div className="mr-4 xl:mr-8 h-10 w-10 rounded-full bg-[#233a95] flex items-center justify-center text-white text-xl cursor-pointer">
                                    <a onClick={() => window.location.href = '/account'}>
                                        {initials}</a></div>
                            ) : (
                                <div className="mr-4 xl:mr-8">
                                    <a onClick={() => window.location.href = '/account'}>
                                        <button className="border rounded-full p-2">
                                            <AiOutlineUser className="text-2xl" />
                                        </button>
                                    </a>
                                </div>
                            )}

                            <div className="bg-white flex justify-center items-center p-2 shadow-md">
                                <div
                                    className="relative"
                                // onMouseEnter={handleEnter}
                                // onMouseLeave={handleLeave}
                                >
                                    <div
                                        className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2 w-10 h-10 cursor-pointer"
                                        onClick={handleCart}
                                    >
                                        <Image src={cartsvg} alt="cart" className="object-cover w-full h-full" />
                                        {/* <BsCart4 className="text-2xl text-primary" /> */}
                                    </div>

                                    {cart && <CartPopup setCart={setCart} />}


                                    {cartCount > 0 && (
                                        <div
                                            className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartCount}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 text-primary">{getPrice(cartAmount)}</div>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile version */}
            <div className="lg:hidden  sticky top-0  w-full bg-white z-50">
                <div className="flex justify-between items-center h-14 px-2">
                    <div>
                        <button className="text-3xl" onClick={handleSideNavbar}>
                            <BsList />
                        </button>
                        {showSideNavbar && (
                            <SideNavBar setShowSideNavbar={setShowSideNavbar} handleSideNavbar={handleSideNavbar} />
                        )}
                    </div>
                    <div className="h-[50px] w-40 sm:col-span-2">
                        <Link href="/">
                            <Image
                                src={logo}
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
                        </Link>
                    </div>
                    <div
                        className="relative"
                    // onMouseEnter={handleEnter}
                    // onMouseLeave={handleLeave}


                    >
                        <div
                            className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2 w-10 h-10 cursor-pointer"
                            onClick={handleCart}
                        >
                            <Image src={cartsvg} alt="cart" className="object-cover w-full h-full" />
                            {/* <BsCart4 className="text-2xl text-primary" /> */}
                        </div>
                        {cart && <CartPopup setCart={setCart} />}
                        {cartCount > 0 && (
                            <div
                                className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
