'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../../../utils/baseUrl";

const CitiesList = () => {

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
    // const cities = shops.map(shop => shop.city);
    return ( 
        <div className="flex flex-col gap-6 ">
        <h2 className="text-lg font-semibold">CITIES WITH NEARBY OFFERS</h2>
        <div className="">
          <section className="grid grid-cols-8 gap-8 shadow-md rounded-md">
              
              {/* {uniqueItems.map((city, index) => (
                < CitiesCard city={city} key={index} />
              ))} */}
              
          </section>
          
        </div>
      </div>
     );
}
 
export default CitiesList;