"use client"
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import baseUrl, {axiosRequest} from "../../../../../utils/baseUrl";
import axios from "axios";
import flyer1 from '../../../../../assets/flyers/flyer_1.jpg'
import flyer2 from '../../../../../assets/flyers/flyer_2.jpg'
import flyer3 from '../../../../../assets/flyers/flyer_3.jpg'
import flyer4 from '../../../../../assets/flyers/flyer_4.jpg'
import flyer5 from '../../../../../assets/flyers/flyer_5.jpg'
import flyer6 from '../../../../../assets/flyers/flyer_6.jpg'
import flyer7 from '../../../../../assets/flyers/flyer_7.jpg'
import MainFlyerCard from "./MainFlyerCard";
import Link from "next/link";


type MainFlyerListType = {
    dictionary: {
        loadMore: string
    },
    locale: string
}

const MainFlyerList = (({dictionary, locale}: MainFlyerListType) => {
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
        <div>
            <div className='w-full h-[70vh] grid grid-cols-2 gap-x-4 gap-y-5
overflow-y-scroll overflow-x-hidden scrollbar-w-2 sm:grid-cols-4
xxl:grid-cols-4 pt-4'>

                {productList?.map((flyer: any, index: number) => (
                <Link href={`/catalog-preview/${flyer._id}`} key={index}>
                    <MainFlyerCard key={index} flyer={flyer}/>
                    </Link>
                ))}
            </div>

            <button
                className="w-full  bg-primary py-2 px-6 text-base font-medium text-white rounded-md hover:bg-primary/80" onClick={()=>{
                    router.push(`/ordermessage?orderId=6492f48e189f0b6f28326db8`);
                }}>
                {dictionary.loadMore}
            </button>
        </div>
    );
})

export default MainFlyerList;
