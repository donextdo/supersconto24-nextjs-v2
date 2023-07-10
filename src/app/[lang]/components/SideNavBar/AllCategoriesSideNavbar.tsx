"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiApple } from "react-icons/ci";
import { GiChickenOven, GiThreeLeaves } from "react-icons/gi";
import {
  MdKeyboardArrowDown,
  MdOutlineBakeryDining,
  MdOutlineFastfood,
  MdOutlineStorage,
} from "react-icons/md";
import { BsCupHot, BsEgg } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import baseUrl from "../../../../../utils/baseUrl";

interface Category {
  _id: string;
  name: string;
  subcategories: any;
  // any other properties
}

const AllcategoriesSideNavbar = ({ setShowSideNavbar }: any) => {
  const [homeOpen, setHomeOpen] = useState(false);
  const [viewCategory, setviewCategory] = useState<Array<Category>>([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [viewSubCategory, setviewSubCategory] = useState<Array<Category>>([]);

  const router = useRouter();

  const toggleHome = () => {
    setHomeOpen(!homeOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/category/categories`);
      console.log(response);
      setviewCategory(response.data.mainCategories);
      setviewSubCategory(response.data.subCategories);
    };
    fetchData();
  }, []);

  const getProductByCategory = (id: any) => {
    router.push(`/filterProduct?categoryId=${id}`);
    setShowSideNavbar(false);
  };
  const handlesubcatgory = (id: any) => {
    setActiveCategory(id);
  };

  console.log("view category : ", viewCategory);

  return (
    <>
      {/* {homeOpen && ( */}
      <div className="text-[13px]  w-full py-2  font-medium bg-white   ">
        <ul className="">
          {viewCategory.map((category, index) => {
            return (
              <li key={index} className="list-item w-full flex-row pt-3">
                <a
                  href="#"
                  className={`block px-2 py-2 text-lg hover:text-[#2bbef9] group ${
                    activeCategory === category._id && isHover
                      ? "text-primary"
                      : "text-primary"
                  }`}
                  onClick={() => getProductByCategory(category?._id)}
                >
                  <div className=" flex flex-row items-center justify-between">
                    <div className="cursor-pointer">{category?.name} </div>
                    {category?.subcategories?.length > 0 && (
                      <div>
                        {activeCategory === category._id ? (
                          <div onClick={() => handlesubcatgory(category?._id)}>
                            <MdKeyboardArrowDown className=" text-gray-500  group-hover:text-[#2bbef9]  "></MdKeyboardArrowDown>
                          </div>
                        ) : (
                          <div onClick={() => handlesubcatgory(category?._id)}>
                            <MdKeyboardArrowDown className="  text-gray-500  group-hover:text-[#2bbef9]  "></MdKeyboardArrowDown>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </a>
                {activeCategory === category._id &&
                category.subcategories.length > 0 ? (
                  <ul
                    className="text-[13px] pl-3 bg-white  "
                    // onMouseEnter={() => setIsHover(true)}
                    // onMouseLeave={handleCategoryLeave}
                  >
                    {category.subcategories.map(
                      (subcategory: any, index: any) => (
                        <li key={index}>
                          {" "}
                          <a
                            href="#"
                            className="cursor-pointer block px-2 py-2 pt-5 text-gray-500 hover:text-[#2bbef9]  "
                            key={subcategory.id}
                            onClick={() =>
                              getProductByCategory(subcategory?._id)
                            }
                          >
                            {subcategory.name}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        <hr className="my-2" />

        {/* <div className="py-2 px-2">
              <p className="hover:text-[#2bbef9] ">Value Of the Day</p>
            </div>
            <div className="py-2 px-2">
              <p className="hover:text-[#2bbef9]">Top 100 Offers</p>
            </div>
            <div className="py-2 px-2">
              <p className="hover:text-[#2bbef9]">New Arrivals</p>
            </div> */}
      </div>
      {/* )} */}
    </>
  );
};

export default AllcategoriesSideNavbar;
