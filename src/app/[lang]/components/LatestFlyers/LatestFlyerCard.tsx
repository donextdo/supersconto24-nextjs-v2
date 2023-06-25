import Image from 'next/image'
import React, { MouseEventHandler, useEffect } from 'react'
import { FaCalendar } from 'react-icons/fa'
import { RiPinDistanceFill } from 'react-icons/ri'


// interface Props {
//     flyer: Catalog,
//     onClick?: MouseEventHandler<HTMLDivElement>

// }

const LatestFlyersCard = ({ flyer }: any) => {
    console.log(flyer.title)
    const dateString = flyer.expiredate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "long",
        day: "numeric",
    });
    return (
        // <div className='w-full h-36  ssm:h-40  lsm:h-56  llsm:h-64  sm:h-44  md:h-52 xmd:h-60  lg:h-72 xlg:h-80  xl:h-64  xxl:h-80  xxxl:h-[360px] rounded-md relative overflow-hidden shadow-sm transition duration-[0.4s] hover:scale-105 cursor-pointer' onClick={onClick}>

        <div className='w-[12.5rem] h-[270px]  overflow-hidden'>
            <div className="h-60 w-full rounded-md shadow-xl border">
                {flyer.pages && flyer.pages[0]?.page_image && (
                    <img
                        src={flyer.pages[0]?.page_image}
                        alt="item1"
                        className="object-cover w-full h-full rounded-md"
                        width={450}
                    />
                )}
            </div>
            <div className="grid grid-cols-5 gap-2 ">
                <div className="col-span-3 ">
                    <h1 className="font-bold text-xs">{flyer.title}</h1>
                    <h1 className="text-[10px]">{flyer.shop_id?.shop_name ? flyer.shop_id?.shop_name : ''}</h1>
                </div>
                <div className="col-span-2">
                    <h1 className="text-[8px] text-[#B5B5B5] text-right">
                        {formattedDate}
                    </h1>
                    {flyer?.shop_id?.distance && <h1 className="text-[8px] text-[#B5B5B5] text-right">{(flyer.shop_id.distance / 1000)?.toFixed(2)}</h1>}
                </div>
            </div>

        </div>
    );
}

export default LatestFlyersCard;