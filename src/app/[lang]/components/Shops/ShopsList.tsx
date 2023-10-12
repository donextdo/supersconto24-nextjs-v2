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

    const uniqueShops = shops.reduce((unique:any, shop:any) => {
      const existingShop = unique.find((s:any) => s.shop_name === shop.shop_name);
      
      if (!existingShop) {
        unique.push(shop);
      }
      
      return unique;
    }, []);
    
    return ( 
        <div className=" w-full ">
        <h2 className="text-lg font-semibold mb-2">SHOPS</h2>
  
        <div className="">
          <section className="w-full ">
            <Slider padding="px-10 py-10">
              {uniqueShops.map((shop:any, index:number) => (
                <Link href={`/shop-preview/${shop._id}`} key={index}>
                  <ShopsCard shop={shop} key={index} />
                 </Link>
              ))}
            </Slider>
          </section>
  
         
  
        </div>
  
      </div>
     );
}
 
export default Shops;