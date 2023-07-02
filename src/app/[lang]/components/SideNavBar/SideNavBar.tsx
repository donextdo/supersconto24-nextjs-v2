import Link from "next/link";
import React, { useState } from "react";
import { FaMugHot } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { MdKeyboardArrowDown, MdOutlineBakeryDining } from "react-icons/md";
import logo from "../../../../../assets/logo/logo.png";
import Image from "next/image";

import { IoCloseSharp } from "react-icons/io5";
import { SideLocation } from "./SideLocation";
import AllcategoriesSideNavbar from "./AllCategoriesSideNavbar";


const SideNavBar = ({ setShowSideNavbar, handleSideNavbar }: any) => {
    const [homeOpen, setHomeOpen] = useState(false);
    const toggleHome = () => {
        setHomeOpen(!homeOpen);
    };
    const [shopOpen, setShopOpen] = useState(false);

    const toggleShop = () => {
        setShopOpen(!shopOpen);
    };

    const handleClose = () => {
        setShowSideNavbar(false);
    };
    return (
        <>
            <div className="fixed inset-0 z-50 grid overflow-y-auto bg-opacity-10 place-items-left bg-slate-900">
                <div className="relative flex flex-col w-full py-6 bg-white rounded-md shadow-md sm:w-[380px] ">
                    <div className="flex justify-between mx-6">
                        <div className="h-[55px] w-auto">
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
                        <div><button className=" border bg-[#c2c2d3] rounded-full p-1" onClick={handleClose}><IoCloseSharp className="text-md font-semibold text-white" /></button></div>
                    </div>

                    {/* Location */}
                    <div className="mx-6 mt-4">
                        <SideLocation />
                    </div>

                    <div>
                        {/* <Allcategories /> */}
                    </div>
                    <div className="mx-4 mt-4">
                        <AllcategoriesSideNavbar setShowSideNavbar={setShowSideNavbar} />
                    </div>
                    <nav>
                        <div>
                            <div className="px-5 text-[#d3d4d7] mt-10">
                                <p className="text-[13px]">Site Navigation</p>
                            </div>

                            {/* Home */}
                            {/* <hr className="my-[10px] md:my-[20px]" /> */}
                            <div className="">
                                {/* <div className="flex justify-between px-6" onClick={toggleHome}>
                  <Link href="/" onClick={handleSideNavbar}> <div className="font-ff-headings text-gray-800 text-[15px] font-semibold ">
                    HOME
                  </div>
                  </Link>
                  <div>
                    <MdKeyboardArrowDown className="text-xl text-[#d3d4d7]" />
                  </div>
                </div> */}
                                {/* {homeOpen && (
                    <div className="text-[13px] absolute w-24 py-2 ml-60 mt-2 shadow-md font-medium ">
                      <Link href="#" className="block px-4 py-2 text-gray-800 ">
                        Home 1
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-gray-800 ">
                        Home 2
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-gray-800 ">
                        Home 3
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-gray-800 ">
                        Home 4
                      </Link>
                      <Link href="#" className="block px-4 py-2 text-gray-800 ">
                        Home 5
                      </Link>
                    </div>
                  )} */}
                            </div>
                            {/* <hr className="my-[10px] md:my-[20px]" /> */}

                            {/* Shop */}
                            <div className="">

                                {/* <div className="flex justify-between px-6" onClick={toggleShop}>
                                    <Link href="/shop" onClick={handleSideNavbar}><div className="font-ff-headings text-gray-800 text-[15px] font-semibold ">
                                        SHOP
                                    </div>
                                    </Link>
                                    <div>
                                        <MdKeyboardArrowDown className="text-xl text-[#d3d4d7]" />
                                    </div>
                                </div> */}

                                {/* Shop DropDown */}
                                {/* {shopOpen && (
                                    <div className="text-[13px] absolute w-24 py-2 ml-60 mt-2 shadow-md font-medium ">
                                        <Link href="#" className="block px-4 py-2 text-gray-800 ">
                                            Shop 1
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-gray-800 ">
                                            Shop 2
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-gray-800 ">
                                            Shop 3
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-gray-800 ">
                                            Shop 4
                                        </Link>
                                        <Link href="#" className="block px-4 py-2 text-gray-800 ">
                                            Shop 5
                                        </Link>
                                    </div>
                                )} */}
                            </div>
                            {/* <hr className="my-[10px] md:my-[20px]" /> */}

                            {/* Meats & SeaFood */}
                            {/* <div className="px-5 font-semibold font-ff-headings ">
                                <button>
                                    <div>
                                        <Link href="/filterProduct?categoryId=6450a82507245756e38fe70a" onClick={handleSideNavbar} className="text-black  flex text-[15px]">
                                            <GiChickenOven className="mr-5 text-xl text-[#d3d4d7]" />
                                            MEATS & SEAFOOD
                                        </Link>
                                    </div>
                                </button>
                            </div>
                            <hr className="my-[10px] md:my-[20px]" /> */}

                            {/* Bakery */}
                            {/* <div className="px-5 font-semibold font-ff-headings ">
                                <button>
                                    <div>
                                        <Link href="/shop" className="text-black flex text-[15px]" onClick={handleSideNavbar}>
                                            <MdOutlineBakeryDining className="mr-5 text-xl text-[#d3d4d7]" />
                                            BAKERY
                                        </Link>
                                    </div>
                                </button>
                            </div> */}

                            <hr className="my-[10px] md:my-[20px]" />

                            {/* Beverages */}
                            {/* <div className="px-5 font-semibold font-ff-headings ">
                                <button>
                                    <div>
                                        <Link href="/shop" className="text-black flex text-[15px]" onClick={handleSideNavbar}>
                                            <FaMugHot className="mr-5 text-xl text-[#d3d4d7]" />
                                            BEVERAGES
                                        </Link>
                                    </div>
                                </button>
                            </div>
                            <hr className="my-[10px] md:my-[20px]" /> */}

                            {/* Blog */}
                            <div className="px-5 font-semibold font-ff-headings " onClick={handleSideNavbar}>
                                <button>
                                    <Link href="blog" className="text-black ">
                                        BLOG
                                    </Link>
                                </button>
                            </div>
                            <hr className="my-[10px] md:my-[20px]" />
                            {/* Contact */}
                            <div className="px-5 font-semibold font-ff-headings " onClick={handleSideNavbar}>
                                <button>
                                    <Link href="/contact" className="text-black ">
                                        CONTACT
                                    </Link>
                                </button>
                            </div>
                            <hr className="my-[10px] md:my-[20px]" />
                        </div>
                    </nav>

                    <div className="mx-6 mt-6 text-[#d9d9e3] text-sm">
                        Copyright 2022 © BunTalk WordPress Theme. All rights reserved. Powered by BuntalkTheme.
                    </div>

                </div>
            </div>
        </>
    );
};

export default SideNavBar;
