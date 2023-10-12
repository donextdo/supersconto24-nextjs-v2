import Image from "next/image";
import { BsShop } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { RiPinDistanceFill } from "react-icons/ri";


const MainFlyerCard = ({ flyer }: any) => {
    const dateString = flyer.expiredate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
    return (
        <div className="w-full space-y-1 hover:scale-110 transform transition-transform">
            <div className="h-70 w-full rounded-md shadow-xl border">
                <Image
                    src={flyer.pages[0]?.page_image}
                    alt="item1"
                    className="object-contain w-full h-full rounded-md bg-[#efefef]"
                    width={450}
                    height={400}
                />
            </div>
            <div>
                <h1 className="font-bold text-md truncate overflow-hidden ...">{flyer.title}</h1>
                <div className="flex items-center gap-2">
                    <BsShop className="text-sm" />
                    <h1 className="text-sm font-semibold">{flyer.shop_id?.customized_shop_name ? flyer.shop_id?.customized_shop_name : flyer.shop_id?.shop_name}</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 ">
                <div className="sm:col-span-3 flex items-center gap-2">
                    <RiPinDistanceFill className="text-sm fill-gray-500" />
                    {flyer?.shop_id?.distance && <h1 className="text-sm text-gray-500 font-semibold">{(flyer.shop_id.distance / 1000)?.toFixed(2)} km</h1>}
                </div>
                <div className="sm:col-span-2  flex items-center sm:justify-end gap-2">
                    <FaCalendarAlt className="text-sm fill-gray-500" />
                    <h1 className="text-sm text-gray-500 text-right font-semibold">
                        {formattedDate}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default MainFlyerCard;