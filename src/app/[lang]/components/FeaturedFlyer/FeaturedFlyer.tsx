"use client"
import LatestFlyersCard from "../LatestFlyers/LatestFlyerCard";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";

import axios from "axios";
import Link from "next/link";
import Slider from "../Shared/Slider";
import baseUrl, { axiosRequest } from "../../../../../utils/baseUrl";
import { BsArrowRight } from "react-icons/bs";


const FeaturedFlyer = () => {
    const [coordinates, setCoordinates] = useState<any>()
    const [productList, setProductList] = useState<any>()
    const [visible, setVisible] = useState(8)

    const searchParams = useSearchParams()!
    const router = useRouter()
    const makeRequest = axiosRequest();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams()
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        console.log("init runs")
        getLocation()
    }, [])


    useEffect(() => {
        console.log(coordinates)
        if (coordinates) {
            const query = {
                lat: coordinates.latitude,
                long: coordinates.longitude
            }

            router.push(`/?${createQueryString("lat", query.lat)}&${createQueryString("long", query.long)}`, {shallow: false})
        }

    }, [coordinates])

    useEffect(() => {
        const url = searchParams.get('long') && searchParams.get('lat') ? `${baseUrl}/catelog/book?long=${searchParams.get('long')}&lat=${searchParams.get('lat')}` : `${baseUrl}/catelog/book`
        makeRequest({url: url})
            .then(data => {
                // Handle the response

                setProductList(data)
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });

    }, [searchParams])


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                setCoordinates(coords)
            });
        }
    }

    console.log("render", productList)

    const showMoreItem = () => {
        setVisible((prevValue)=>prevValue + 8)
    }
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
          <div
            className=" p-2 h-9 flex flex-row rounded-full border border-gray-300 text-sm w-32 text-gray-500 px-4 justify-between cursor-pointer"
            
          >
            View All
            <span>
              <BsArrowRight className="text-lg"></BsArrowRight>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {productList?.map((flyer: any, index: number) => (
            <Link href={`/catalog-preview/${flyer._id}`} key={index}>
                <LatestFlyersCard key={index} flyer={flyer}/>
                </Link>
            ))}
            </div>
            </>
     );
}
 
export default FeaturedFlyer;