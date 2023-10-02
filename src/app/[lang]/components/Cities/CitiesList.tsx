'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../../../utils/baseUrl";
import CitiesCard from "./CitiesCard";
import Slider from "../Shared/Slider";
import Link from "next/link";

const CitiesList = () => {

  const [shops, setShops] = useState<any>([])
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
  const cities = shops.map((shop: any) => shop.city);
  const uniqueCities = Array.from(new Set(cities));
  // console.log("city", cities)
  // console.log("new city", uniqueCities)

  return (
    <div className="flex flex-col gap-6 ">
      <h2 className="text-lg font-semibold">CITIES WITH NEARBY OFFERS</h2>
      <div className="">
        <section className="w-full">
          <Slider padding="px-10 py-5" grid="grid-rows-3" gap="gap-x-4 gap-y-2">
            {uniqueCities.map((city: any, index: number) => (
              <Link key={index} href={`/city/${city}`}>
                < CitiesCard city={city} key={index} />
              </Link>
            ))}
          </Slider>
        </section>

      </div>
    </div>
  );
}

export default CitiesList;