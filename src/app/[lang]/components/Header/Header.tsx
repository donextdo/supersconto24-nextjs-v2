'use client'


import { SearchItem } from "../Search/Search";
import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import Link from "next/link";
import { BsList } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../../../assets/logo/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/[lang]/redux/store";
// import getConfig from "next/config";
import { Location } from "../Location/Location";
// import SideNavBar from "../SideNavBar/SideNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartPopup from "@/app/[lang]/features/cart/popup-cart/CartPopup";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";


const Header = () => {
  const [cart, setCart] = useState(false);
  const [showSideNavbar, setShowSideNavbar] = useState(false)
  // const [totalCount, setTotalCount] = useState(0)
  const totalCount = useSelector((state: RootState) => state.cart.totalCount);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const {getPrice} = useCurrency()

  useEffect(() => {
    localStorage.setItem('totalCount', totalCount.toString());
  }, [totalCount]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem('cartItems');
    const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
    if (cartItemsArray.length > 0){
      const sum = cartItemsArray.reduce((accumulator: any, currentValue: any) => accumulator + (currentValue.count * currentValue.unit_price), 0);
      const sumQuantity = cartItemsArray.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.count, 0);
      setTotalPrice(sum)
      setTotalQuantity(sumQuantity)
    }
  },[]);

  const handleClick = () => {
    setCart(!cart)
    // router.push("/cart")

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


  return (
    <>
      <div className="hidden md:block container mx-auto xl:px-40 px-5">
        <div className=" flex items-center flex-row py-2">
          <div className="basis-1/4 text-4xl font-bold text-[#223994]">
            <Link href="/">
              <div className="h-[50px] w-auto ">
                {/* <Logo /> */}
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
          <div className="basis-1/4 lg:visible md:visible invisible">
            <Location />
          </div>
          <div className="basis-2/4 search-bar">
            <SearchItem />
          </div>

          <div className="basis-1/4 flex  justify-end items-center font-semibold">
            <div className="mx-4">
              <Link href="/account">
                <button className="border rounded-full p-2">
                  <AiOutlineUser className="text-2xl" />
                </button>
              </Link>
            </div>
            <div className="mr-4">{getPrice(totalPrice)}</div>
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

              {cart && <CartPopup setCart={setCart} />}
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </div>
              )}
            </div>
            <div>{ }</div>
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
            {/* {showSideNavbar && (
              <SideNavBar setShowSideNavbar={setShowSideNavbar} handleSideNavbar={handleSideNavbar}/>
            )} */}
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
            {cart && <CartPopup setCart={setCart} setTotalPrice={setTotalPrice} />}
            {totalQuantity > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
