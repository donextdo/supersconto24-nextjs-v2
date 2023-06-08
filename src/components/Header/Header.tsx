'use client'


import { SearchItem } from "../Search/Search";
import { AiOutlineUser } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import Link from "next/link";
import { BsList } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../assets/logo/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import getConfig from "next/config";
import { Location } from "../Location/Location";
// import SideNavBar from "../SideNavBar/SideNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartPopup from "@/features/cart/popup-cart/CartPopup";


const Header = () => {
  const [cart, setCart] = useState(false);
  const [showSideNavbar, setShowSideNavbar] = useState(false)
  // const [totalCount, setTotalCount] = useState(0)
  const totalCount = useSelector((state: RootState) => state.cart.totalCount);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('totalCount', totalCount.toString());
  }, [totalCount]);
  
  // const { publicRuntimeConfig } = getConfig();

  // const logoUrl = publicRuntimeConfig.APP_LOGO_URL;

  // const Logo = () => {
  //   if (logoUrl !== "") {
  //     console.log("logo url");
  //     return (
  //       <Image
  //         src={logoUrl}
  //         alt={publicRuntimeConfig.APP_NAME}
  //         style={{
  //           objectFit: "contain",
  //           backgroundColor: "white",
  //           width: "100%",
  //           height: "100%",
  //         }}
  //         width={450}
  //         height={400}
  //       />
  //     );
  //   } else {
  //     console.log("logo url");
  //     return (
  //       <Image
  //         src={logo}
  //         alt="item1"
  //         style={{
  //           objectFit: "contain",
  //           backgroundColor: "white",
  //           width: "100%",
  //           height: "100%",
  //         }}
  //         width={450}
  //         height={400}
  //       />
  //     );
  //   }
  // };

  const handleClick = () => {
    setCart(!cart)
    // router.push("/cart")

  };
  const hnadleEnter = () => {
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
            <div className="mr-4">Rs {totalAmount.toFixed(2)}</div>
            <div
              className="relative"
              onMouseEnter={hnadleEnter}
              onMouseLeave={handleLeave}
            >
              <button
                className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
                onClick={handleClick}
              >
                <SlHandbag className="text-2xl text-[#ea2b0f]" />
              </button>

              {cart && <CartPopup setCart={setCart} />}
              {totalCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCount}
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
            onMouseEnter={hnadleEnter}
            onMouseLeave={handleLeave}
          >
            <button
              className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
              onClick={handleClick}
            >
              <SlHandbag className="text-2xl text-[#ea2b0f]" />
            </button>
            {cart && <CartPopup setCart={setCart} />}
            {totalCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {totalCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
