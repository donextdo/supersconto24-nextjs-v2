import Image from "next/image";

const MainFlyerCard = ({flyer}:any) => {
    const dateString = flyer.expiredate;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  });
    return ( 
        <div className="w-full space-y-1">
            <div className="h-60 w-full rounded-md shadow-xl border">
                <Image
                    src={flyer.pages[0].page_image}
                    alt="item1"
                    className="object-cover w-full h-full rounded-md"
                    width={450}
                    height={400}
                
                />

            </div>
            <div className="grid grid-cols-5 gap-2 ">
                <div className="col-span-3 ">
                    <h1 className="font-bold text-xs">{flyer.title}</h1>
                    <h1 className="text-[10px]">{flyer.shop_id.shop_name}</h1>
                </div>
                <div className="col-span-2">
                    <h1 className="text-[8px] text-[#B5B5B5] text-right">{formattedDate}</h1>
                    <h1 className="text-[8px] text-[#B5B5B5] text-right">{flyer.distance}</h1>
                </div>

            </div>
        </div>
     );
}
 
export default MainFlyerCard;