import Image from "next/image";

const MainFlyerCard = ({flyer}:any) => {
    return ( 
        <div className="w-full space-y-1">
            <div className="h-48 w-full rounded-md">
                <Image
                    src={flyer.flyer}
                    alt="item1"
                    className="object-cover w-full h-full rounded-md"
                />

            </div>
            <div className="grid grid-cols-5 gap-2 ">
                <div className="col-span-3 ">
                    <h1 className="font-bold text-xs">{flyer.title}</h1>
                    <h1 className="text-[10px]">{flyer.shopName}</h1>
                </div>
                <div className=" col-span-2">
                    <h1 className="text-[8px] text-[#B5B5B5] text-right">{flyer.date}</h1>
                    <h1 className="text-[8px] text-[#B5B5B5] text-right">{flyer.distance}</h1>
                </div>

            </div>
        </div>
     );
}
 
export default MainFlyerCard;