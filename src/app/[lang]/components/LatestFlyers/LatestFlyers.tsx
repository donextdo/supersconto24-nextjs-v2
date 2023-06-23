"use client"
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";
import axios from "axios";
import Link from "next/link";
import Slider from "../Shared/Slider";
import LatestFlyersCard from "./LatestFlyerCard";


type MainFlyerListType = {
    dictionary: {
        loadMore: string
    },
    locale: string
}




const LatestFlyers = ({dictionary, locale}: MainFlyerListType) => {

    const [coordinates, setCoordinates] = useState<any>()
    const [productList, setProductList] = useState<any>()
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

    return (
        <div className='flex flex-col w-full gap-6'>

            <h2 className='text-lg font-semibold'>
                LATEST FLYERS
            </h2>
            <div className="">
                <section className="w-full ">
                    <Slider >

                    {productList?.map((flyer: any, index: number) => (
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