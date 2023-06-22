'use client'
import Link from "next/link";
import Slider from "../Shared/Slider";
import ShopsCard from "./ShopsCard";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";
import { useEffect, useState } from "react";

const Shops = () => {
    const [shops,setShops] = useState ([])
    useEffect(() => {
        fetchData()
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
    return ( 
        <div className="flex flex-col w-full gap-6">
        <h2 className="text-lg font-semibold">SHOPS</h2>
  
        <div className="">
          <section className="w-full ">
            <Slider padding="px-10 py-10">
              {shops.map((shop, index) => (
                // <Link href={`/shop-preview/${shop._id}`} key={index}>
                  <ShopsCard shop={shop} key={index} />
                // </Link>
              ))}
            </Slider>
          </section>
  
         
  
        </div>
  
      </div>
     );
}
 
export default Shops;