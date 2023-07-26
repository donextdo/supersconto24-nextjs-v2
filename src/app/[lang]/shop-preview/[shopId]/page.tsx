"use client";
import { useEffect, useState } from "react";
import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";
import MainFlyerCard from "../../components/MainFlyer/MainFlyerCard";
import OneShop from "../../components/Shops/OneShop";

interface IProps {
    params: {
        shopId: string;
    };
}

interface ShopInfo {
    address: {
        address :string;
    };
    state: string;
    postal_code: string;
    _id: string;
    catelog_books: [];
    coordinates: [number, number];
    createdAt: string;
    description: string;
    isDelete: boolean;
    is_online_selling: boolean;
    latitude: number;
    logo_img: string;
    longitude: number;
    owner_name: string;
    shop_category: string;
    shop_name: string;
    shop_unique_id: string;
    status: boolean;
    telephone: string;
    updatedAt: string;
}
const ShopPage = ({ params }: IProps) => {
    const shopId = params.shopId;
    const [catelogs, setCatelogs] = useState([]);
    const [shopOne, setShopOne] = useState<ShopInfo>({
        address: {
            address:"",
        },
        state: "",
        postal_code: "",
        _id: "",
        catelog_books: [], // You can put an initial array of books here if you know the structure
        coordinates: [0, 0], // Set initial latitude and longitude
        createdAt: "",
        description: "",
        isDelete: false,
        is_online_selling: false,
        latitude: 0, // Set initial latitude
        logo_img: "",
        longitude: 0, // Set initial longitude
        owner_name: "",
        shop_category: "",
        shop_name: "", // Set initial shop name to an empty string
        shop_unique_id: "",
        status: false, // Set initial status
        telephone: "",
        updatedAt: "",
    });

    useEffect(() => {
        fetchShopData();
    }, [shopId]);

    async function fetchShopData() {
        try {
            const res = await axios.get(`${baseUrl}/shop/find/${shopId}`);
            console.log(res.data);
            console.log(res.data.catelog_books);
            const data = res.data.catelog_books;
            setCatelogs(data);
            setShopOne(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(shopOne);
    return (
        <div className="container mx-auto xl:px-40 px-5 my-4">
            <div className="flex items-center gap-4 ">
                <div className="w-[120px] h-[70px]">
                    <img
                        src={shopOne.logo_img}
                        alt={shopOne.shop_name}
                        className="object-contain w-full h-full "
                    />
                </div>
                <h1 className="font-bold">{shopOne.shop_name} - {shopOne.address.address}</h1>
            </div>
            <div className=" mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2"
            >
                {catelogs.map((flyer: any, index: number) => (
                     <a
                     onClick={() => {
                         window.location.href = `/catalog-preview/${flyer._id
                             }`;
                     }}
                     className="cursor-pointer"
                     key={index}
                 >
                    <OneShop key={index} flyer={flyer}  />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
