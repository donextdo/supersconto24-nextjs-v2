"use client";
import { useEffect, useState } from "react";
import AllCategories from "./AllCategories";
import PageNavBar from "./PageNavBar";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";

const NavBar = () => {
  const [totalProduct, setTotalProduct] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/catelog/item/count`);
      setTotalProduct(response.data);
      console.log("response: ", response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="hidden md:hidden xl:block container mx-auto xl:px-40 px-5">
      <div className=" lg:flex lg:flex-row  lg:justify-between lg:items-center">
        <div className="lg:flex lg:flex-col items-center">
          <div className="mt-4">
            <AllCategories />
          </div>
          {/* <div className="flex justify-center items-center bg-[#edeef5] rounded-full h-[18px] w-[120px] -mt-6">
            <h1 className="text-[#71778e] text-[10px]">
              TOTAL {totalProduct} PRODUCTS
            </h1>
          </div> */}
        </div>
        <div className="lg:flex lg:flex-col  ">
          <PageNavBar />
        </div>
      </div>

      {/* <hr className="my-0" /> */}
    </div>
  );
};
export default NavBar;
