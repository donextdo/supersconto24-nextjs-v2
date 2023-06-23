"use client";
import Link from "next/link";
import { GiChickenOven } from "react-icons/gi";
import { FaMugHot } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";

const PageNavBar = () => {
  const [homeOpen, setHomeOpen] = useState(false);
  const toggleHome = () => {
    setHomeOpen(homeOpen);
  };
  const [shopOpen, setShopOpen] = useState(false);

  const toggleShop = () => {
    setShopOpen(shopOpen);
  };
  return (
    <div className="lg:flex lg:flex-row ">
      <ul className="lg:space-x-1 lg:flex gap gap-0">
        {/* <li className="font-semibold rounded-full bg-[#F0FAFF] ">
          <button onMouseEnter={toggleShop} className="lg:py-2 lg:px-4">
            <div>
              <Link
                href="#"
                className="text-[#4BB62E] flex text-[15px]  font-ff-headings"
              >
                HOME
                <MdKeyboardArrowDown className="ml-2 text-xl" />
              </Link>
            </div>
          </button>

          {homeOpen && (
            <div className="text-[13px] absolute w-40 py-2 mt-2 shadow-md font-medium bg-white rounded-lg ">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Home 1
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Home 2
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Home 3
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Home 4
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Home 5
              </Link>
            </div>
          )}
        </li> */}

        {/* Shop */}
        <li className="font-semibold hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
          <button onMouseEnter={toggleShop} className="lg:py-2 lg:px-4">
            <div>
              <Link
                href="#"
                className="hover:text-[#4BB62E] flex text-gray-700 text-[15px]  font-ff-headings"
              >
                SHOP
                <MdKeyboardArrowDown className="ml-2 text-xl" />
              </Link>
            </div>
          </button>
        </li>
        {/* Meats & SeaFood */}
        <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
          <button
            // onMouseEnter={toggleShop}
            className="lg:py-2 lg:px-4 inline-flex items-center"
            // onClick={() => handleMeat("Meats & Seafood")}
          >
            <GiChickenOven className="text-xl mr-2" />
            <Link
              // href={"/shop"}
              href="#"
              className="hover:text-[#4BB62E] flex text-gray-700 text-[15px]"
            >
              MEATS &amp; SEAFOOD
            </Link>
          </button>
        </li>
        {/* Bakery */}
        <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
          <button
            // onMouseEnter={toggleShop}
            className="lg:py-2 lg:px-4 inline-flex items-center"
            // onClick={() => handleMeat("Breads & Bakery")}
          >
            <MdOutlineBakeryDining className="text-xl mr-2" />
            <Link
              // href={"/shop"}
              href="#"
              className="hover:text-[#4BB62E] flex text-gray-700 text-[15px]"
            >
              BAKERY
            </Link>
          </button>
        </li>
        {/* Beverages */}
        <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
          <button
            // onMouseEnter={toggleShop}
            className="lg:py-2 lg:px-4 inline-flex items-center"
            // onClick={() => handleMeat("Beverages")}
          >
            <FaMugHot className="text-xl mr-2" />
            <Link
              // href={"/shop"}
              href="#"
              className="hover:text-[#4BB62E] flex text-gray-700 text-[15px]"
            >
              BEVERAGES
            </Link>
          </button>
        </li>
        {/* Blog */}
        {/* <li className="font-semibold font-ff-headings">
          <button className="lg:py-2 lg:px-4 lg:ml-4  hover:rounded-full  hover:bg-[#F0FAFF]">
            <Link href="#" className="text-gray-700 hover:text-[#4BB62E]">
              BLOG
            </Link>
          </button>
        </li> */}

        {/* Contact */}
        <li className="font-semibold font-ff-headings">
          <button className="lg:py-2 lg:px-4 lg:ml-4 hover:rounded-full hover:bg-[#F0FAFF]">
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#4BB62E] "
            >
              CONTACT
            </Link>
          </button>
        </li>
      </ul>
      {/* Shop DropDown */}
      {shopOpen && (
        <div className="w-full xl:px-16 text-[13px] grid grid-flow-col py-2 mt-2 font-medium  rounded-lg grid-col-5">
          <div className="relative mx-5">
            <p className="font-bold px-4 text-[#233a95] hover:text-[#4BB62E]">
              Shop Lists
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="block  px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Shop Default
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Shop Right Sidebar
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Shop Wide
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                List Left Sidebar
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Load More Button
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Infinite Scrolling
              </Link>
            </div>
          </div>

          <div className="mx-5">
            <p className="font-bold px-4  text-[#233a95] hover:text-[#4BB62E]">
              Product Detail
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Product Default
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Product Variable
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Product Grouped
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Product External
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Product Downloadable
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Product With Video
              </Link>
            </div>
          </div>

          <div className="mx-5">
            <p className="font-bold px-4 text-[#233a95] hover:text-[#4BB62E]">
              Product Types
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Single Type 1
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Single Type 2
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Single Type 3
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Single Type 4
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Thumbnails Left
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Zoom Image
              </Link>
            </div>
          </div>

          <div className="mx-5">
            <p className="font-bold px-4 text-[#233a95] hover:text-[#4BB62E]">
              Shop Pages
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Cart
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Checkout
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                My Account
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Wishlist
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Order Tracking
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Order On WhatsApp
              </Link>
            </div>
          </div>

          <div className="mx-5">
            <p className="font-bold px-4 text-[#233a95] hover:text-[#4BB62E]">
              Shop Layouts
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Two Columns
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Three Columns
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Three Columns Wide
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Four Columns
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Four Columns Wide
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Five Columns Wide
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageNavBar;
