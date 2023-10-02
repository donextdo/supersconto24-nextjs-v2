"use client"
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import MainFlyerCard from "../MainFlyer/MainFlyerCard";
import {useSearchParams} from "next/navigation";
const FeaturedFlyer = () => {

    const productList = useSelector((state: RootState) => state.flyer.flyers);
    const searchParams = useSearchParams()
    const getRandomItems = (array: any = [], count: number) => {
        const shuffled = array.slice().sort(() => 0.5 - Math.random()); // Create a copy and shuffle the array
        return shuffled.slice(0, count); // Return the first 'count' items
    };

    const currentDate = new Date();

    const featuredProducts = productList.filter(product => product.flyer === true && product.active == true);
    
    const notExpiredData = featuredProducts.filter(item => {
        const expireDate = new Date(item.expiredate);
        const expired = expireDate > currentDate;
        return expired
    });

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

                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 bg-white shadow-lg p-4">
                {getRandomItems(notExpiredData, 4).map((flyer: any, index: number) => (
                    <a onClick={() => {
                        window.location.href = `/catalog-preview/${flyer._id}?currency=${searchParams.get("currency")}`
                    }} key={index}>
                        <MainFlyerCard key={index} flyer={flyer}/>
                    </a>
                ))}
            </div>
        </>
    );
}

export default FeaturedFlyer;