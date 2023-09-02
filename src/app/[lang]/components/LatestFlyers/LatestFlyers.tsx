"use client"
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import Slider from "../Shared/Slider";
import LatestFlyersCard from "./LatestFlyerCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";







const LatestFlyers = () => {

    const productList = useSelector((state: RootState) => state.flyer.flyers);
    const activeProduct = productList.filter((product:any)=>product.active === true)
    const currentDate = new Date();

    const notExpiredData = activeProduct.filter(item => {
        const expireDate = new Date(item.expiredate);
        const expired = expireDate > currentDate;
        return expired
    });

    console.log("render", productList)

    return (
        <div className='flex flex-col w-full gap-6'>

            <h2 className='text-lg font-semibold'>
                TOP DEALS
            </h2>
            <div className="">
                <section className="w-full ">
                    <Slider >

                    {notExpiredData?.map((flyer: any, index: number) => (
                <Link href={`/catalog-preview/${flyer._id}`} key={index}>
                    <LatestFlyersCard key={index} flyer={flyer}/>
                    </Link>
                ))}

                    </Slider>
                </section>
                {/* <section className="w-full col-span-2"></section> */}
            </div>



        </div>
    )
}

export default LatestFlyers