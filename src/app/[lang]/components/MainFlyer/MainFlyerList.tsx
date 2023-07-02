"use client"
import {useCallback, useEffect, useState} from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import baseUrl, {axiosRequest, updateParamValue} from "../../../../../utils/baseUrl";
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
import {useDispatch, useSelector} from "react-redux";
import {addFlyer} from "./FlyerSlice";
import {AppDispatch, RootState} from "../../redux/store";
import {getExchangeRates} from "@/app/[lang]/features/site-data/siteDataSlice";


type MainFlyerListType = {
    dictionary: {
        loadMore: string
    },
    locale: string
}

const MainFlyerList = (({dictionary, locale}: MainFlyerListType) => {
    const [coordinates, setCoordinates] = useState<any>()
    // const [productList, setProductList] = useState<any>()
    const [visible, setVisible] = useState(8)
    const productList = useSelector((state: RootState) => state.flyer.flyers);
    const dispatch = useDispatch<AppDispatch>()
    const pathname = usePathname()
    const searchParams = useSearchParams()!
    const router = useRouter()
    const makeRequest = axiosRequest();

    /*const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )*/

    useEffect(() => {
        console.log("init runs")
        getLocation()
    }, [])


    useEffect(() => {
        console.log(pathname)
        if (coordinates) {
            // const query = {
            //     lat: coordinates.latitude,
            //     long: coordinates.longitude
            // }

            // router.push(`${pathname}?${createQueryString("lat", query.lat)}&${createQueryString("long", query.long)}`, {shallow: false})

            const data = [
                {key: 'lat', value: coordinates.latitude},
                {key: 'long', value: coordinates.longitude},
            ];
            router.push(updateParamValue(data), {shallow: false})
        }

    }, [coordinates])

    useEffect(() => {
        const url = searchParams.get('long') && searchParams.get('lat') ? `${baseUrl}/catelog/book?long=${searchParams.get('long')}&lat=${searchParams.get('lat')}` : `${baseUrl}/catelog/book`
        makeRequest({url: url})
            .then(data => {
                // Handle the response

                // setProductList(data)
                dispatch(addFlyer(data))

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
        setVisible((prevValue) => prevValue + 8)
    }

    return (
        <div>
            <div className='w-full h-[48vh] grid grid-cols-2 gap-x-4 gap-y-5
overflow-y-scroll overflow-x-hidden scrollbar-w-2 sm:grid-cols-4
xxl:grid-cols-4 pt-4'>

                {productList?.slice(0, visible).map((flyer: any, index: number) => (
                    <a onClick={() => {
                        window.location.href = `/catalog-preview/${flyer._id}?currency=${searchParams.get("currency")}`
                    }} key={index}>
                        <MainFlyerCard key={index} flyer={flyer}/>
                    </a>
                ))}
            </div>

            <button
                className="w-full  bg-[#F5F5F5] py-2 px-6 text-base font-medium text-[#898989] rounded-md hover:bg-[#E7E7E7]"
                onClick={() => {
                    setVisible((prevValue) => prevValue + 8)
                }}>
                {dictionary.loadMore}
            </button>
        </div>
    );
})

export default MainFlyerList;
