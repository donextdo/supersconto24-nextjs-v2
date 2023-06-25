"use client"
import LatestFlyersCard from "../LatestFlyers/LatestFlyerCard";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";

import axios from "axios";
import Link from "next/link";
import Slider from "../Shared/Slider";
import baseUrl, { axiosRequest } from "../../../../../utils/baseUrl";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MainFlyerCard from "../MainFlyer/MainFlyerCard";


const FeaturedFlyer = () => {
   
    const productList = useSelector((state: RootState) => state.flyer.flyers);

   
    console.log(productList)


    return ( 
        <>
      <div>
        <div className="flex flex-row items-center justify-between mb-9 ">
          <div className="flex flex-col">
            <div className="uppercase font-semibold text-lg font-ff-headings lg:text-xl">
              Featured Flyer
            </div>
            <div className="text-xs text-gray-400">
              {/* Do not miss the current offers until the end of March. */}
            </div>
          </div>
          {/* <div
            className=" p-2 h-9 flex flex-row rounded-full border border-gray-300 text-sm w-32 text-gray-500 px-4 justify-between cursor-pointer"
            
          >
            View All
            <span>
              <BsArrowRight className="text-lg"></BsArrowRight>
            </span>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {productList?.map((flyer: any, index: number) => (
            <Link href={`/catalog-preview/${flyer._id}`} key={index}>
                <MainFlyerCard key={index} flyer={flyer}/>
                </Link>
            ))}
            </div>
            </>
     );
}
 
export default FeaturedFlyer;