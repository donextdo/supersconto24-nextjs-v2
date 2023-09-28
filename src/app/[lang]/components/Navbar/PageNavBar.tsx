"use client";
import Link from "next/link";
import { GiChickenOven } from "react-icons/gi";
import { FaMugHot } from "react-icons/fa";
import { MdOutlineBakeryDining } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AllCategories from "./AllCategories";

const PageNavBar = () => {
  const [homeOpen, setHomeOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [allShop, setAllShop] = useState<any>([])

  const toggleHome = () => {
    setHomeOpen(true);
  };

  const toggleHomeLeave = () => {
    setHomeOpen(false);
  };


  const toggleShop = () => {
    setShopOpen(!shopOpen);
  };

  const toggleShopEnter = () => {
    setShopOpen(true);
  };

  const toggleShopLeave = () => {
    setShopOpen(false);
  };

  useEffect(() => {
    fetchShopData();
  }, []);


  async function fetchShopData() {
    try {
      const res = await axios.get(`${baseUrl}/shop`);
      const data = res.data;
      setAllShop(data)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="lg:flex lg:flex-row ">
      <div className="lg:space-x-1 lg:flex gap gap-0">

        {/* Blog */}
        <div className="font-semibold ">
            <div  className="text-gray-700 hover:text-[#4BB62E]">
            <AllCategories /> 
            </div>
        </div>

        {/* Shop */}
        <div className="font-semibold hoverable hover:rounded-full relative hover:bg-[#F0FAFF] " onMouseEnter={toggleShopEnter} onMouseLeave={toggleShopLeave}>
          <button onClick={toggleShop} className="lg:py-2 lg:px-4">
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

          {shopOpen && (
            <div className="text-[13px] absolute w-40 py-2 top-10 shadow-md font-medium bg-white rounded-lg z-50">
              {allShop.map((shop: any, index: number) => (
                <Link
                  key={index}
                  href={`/shop-preview/${shop._id}`}
                  className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
                >
                  {shop?.shop_name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* <div className="font-semibold rounded-full hover:bg-[#F0FAFF] relative" onMouseEnter={toggleHome} onMouseLeave={toggleHomeLeave} >
          <button className="lg:py-2 lg:px-4">
            <div className="hover:text-[#4BB62E] flex text-[15px]  font-ff-headings">
                Our Menu
                <MdKeyboardArrowDown className="ml-2 text-xl" />
            </div>
          </button>

          {homeOpen && (
            <div className="text-[13px] absolute w-40 py-2 top-10 shadow-md font-medium bg-white rounded-lg z-50">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                MEATS &amp; SEAFOOD
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                BAKERY
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                BEVERAGES
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E] "
              >
                Desserts
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-800 hover:text-[#4BB62E]"
              >
                Furniture
              </Link>
            </div>
          )}
        </div> */}


        {/* Meats & SeaFood */}
        {/* <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
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
        </li> */}
        {/* Bakery */}
        {/* <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
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
        </li> */}
        {/* Beverages */}
        {/* <li className="font-semibold font-ff-headings hoverable hover:rounded-full  hover:bg-[#F0FAFF] ">
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
        </li> */}


        {/* Blog */}
        <div className="font-semibold ">
          <button className="lg:py-2 lg:px-4 lg:ml-4  hover:rounded-full  hover:bg-[#F0FAFF]">
            <Link href="/blog" className="text-gray-700 hover:text-[#4BB62E]">
              BLOG
            </Link>
          </button>
        </div>

        {/* Contact */}
        <div className="font-semibold font-ff-headings">
          <button className="lg:py-2 lg:px-4 lg:ml-4 hover:rounded-full hover:bg-[#F0FAFF]">
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#4BB62E] "
            >
              CONTACT
            </Link>
          </button>
        </div>
      </div>
      {/* Shop DropDown */}
      {/* {shopOpen && (
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
      )} */}
    </div>
  );
};

export default PageNavBar;
