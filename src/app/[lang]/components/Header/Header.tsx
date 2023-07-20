'use client'
import { SearchItem } from "../Search/Search";
import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import Link from "next/link";
import { BsList } from "react-icons/bs";
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
        setCart(!cart)
    };
    const handleEnter = () => {
        setCart(true);
    };
    const handleLeave = () => {
        setCart(false);
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

    console.log("da", authUser)
    return (
        <>
            <div className="hidden md:block container mx-auto xl:px-40 px-5 sticky top-0 z-1 bg-white ">
                <div className=" flex items-center flex-row  py-2">
                    <div className="basis-1/4 text-4xl font-bold text-[#223994] flex justify-start">
                        <Link href="/">
                            <div className="h-[50px] w-auto ">
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
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-start items-center basis-1/4 lg:visible md:visible invisible">
                        <Location />
                    </div>
                    <div className="flex justify-start items-center font-semibold">
                        <div className="mx-4">
                            <a onClick={() => getMyLocation()}>
                                <button className="border rounded-full p-2">
                                    <BiCurrentLocation className="text-lg text-black" />
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="basis-2/4 search-bar">
                        <SearchItem />
                    </div>

                    <div className="basis-1/4 flex  justify-end items-center font-semibold">
                        {authUser?._id ? (
                            <div className="mx-4 h-10 w-10 rounded-full bg-[#233a95] flex items-center justify-center text-white text-xl cursor-pointer">
                                <a onClick={() => window.location.href = '/account'}>
                                    {initials}</a></div>
                        ) : (
                            <div className="mx-4">
                                <a onClick={() => window.location.href = '/account'}>
                                    <button className="border rounded-full p-2">
                                        <AiOutlineUser className="text-2xl" />
                                    </button>
                                </a>
                            </div>
                        )}

                        <div className="mr-4">{getPrice(cartAmount)}</div>
                        <div
                            className="relative"
                            onMouseEnter={handleEnter}
                            onMouseLeave={handleLeave}
                        >
                            <button
                                className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
                                onClick={handleClick}
                            >
                                <SlHandbag className="text-2xl text-[#ea2b0f]" />
                            </button>

                            {cart && <CartPopup />}
                            {cartCount > 0 && (
                                <div
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </div>
                            )}
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            {/* mobile version */}
            <div className="md:hidden  sticky top-0  w-full bg-white z-50">
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
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <button
                            className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
                            onClick={handleClick}
                        >
                            <SlHandbag className="text-2xl text-[#ea2b0f]" />
                        </button>
                        {cart && <CartPopup />}
                        {cartCount > 0 && (
                            <div
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
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
