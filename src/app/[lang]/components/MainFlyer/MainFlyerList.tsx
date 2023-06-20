"use client"
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";
import flyer1 from '../../../../../assets/flyers/flyer_1.jpg'
import flyer2 from '../../../../../assets/flyers/flyer_2.jpg'
import flyer3 from '../../../../../assets/flyers/flyer_3.jpg'
import flyer4 from '../../../../../assets/flyers/flyer_4.jpg'
import flyer5 from '../../../../../assets/flyers/flyer_5.jpg'
import flyer6 from '../../../../../assets/flyers/flyer_6.jpg'
import flyer7 from '../../../../../assets/flyers/flyer_7.jpg'
import MainFlyerCard from "./MainFlyerCard";



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

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams()
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        getLocation()
    }, [])


    useEffect(() => {
        console.log(coordinates)
        if (coordinates) {
            const query = {
                lat: coordinates.latitude,
                long: coordinates.longitude
            }

            router.push(`/${locale}?${createQueryString("lat", query.lat)}&${createQueryString("long", query.long)}`, {shallow: false})
        }

    }, [coordinates])

    useEffect(() => {
        const url = searchParams.get('long') && searchParams.get('lat') ? `${baseUrl}/catelog/book?long=${searchParams.get('long')}&lat=${searchParams.get('lat')}` : `${baseUrl}/catelog/book`
        axios.get(url).then((res) => {
            setProductList(res.data)
        }).catch(err => console.log(err))

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
            <div className='w-full h-[80vh] grid grid-cols-2 gap-x-4 gap-y-5
overflow-y-scroll overflow-x-hidden scrollbar-w-2 sm:grid-cols-4
xxl:grid-cols-4 '>

                    {productList?.map((flyer:any, index:number)=>(
                        <MainFlyerCard key={index} flyer={flyer}/>
                    ))}
            </div>

            <button
                className="w-full  bg-primary py-2 px-6 text-base font-medium text-white rounded-md hover:bg-primary/80">
                {dictionary.loadMore}
            </button>
        </div>
    );
})

export default MainFlyerList;
