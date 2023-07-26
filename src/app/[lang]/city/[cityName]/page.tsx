'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../../../utils/baseUrl";
import Link from "next/link";

interface IProps {
    params: {
        cityName: string;
    };
}
const CityPage = ({ params }: IProps) => {
    const encodeCity = params.cityName
    const city = decodeURIComponent(encodeCity)
    const [shops, setShops] = useState<any>([])
    useEffect(() => {
        fetchData()
        console.log(params)
        console.log(city)

    }, []);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/shop`);
            console.log(res.data)
            setShops(res.data)

        } catch (err) {
            console.log(err);
        }
    }

    const filteredShops = shops.filter((shop: any) => shop.city === city)
    console.log(filteredShops)
    return (
        <div className="container mx-auto xl:px-40 px-5 my-4">
            <div className="grid grid-cols-2 md:grid-cols-4">
                {filteredShops.map((shop: any, index: any) => (
                    <Link
                        key={index}
                        href={`/shop-preview/${shop._id}`}

                    >
                        <div className="shadow-md rounded-md bg-[#f5f5f5]">
                            <div className="w-[120px] h-[70px]">
                                <img
                                    src={shop.logo_img}
                                    alt={shop.shop_name}
                                    className="object-contain w-full h-full "
                                />
                            </div>
                            <div key={index} className="text-lg font-bold">{shop.shop_name}</div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CityPage;