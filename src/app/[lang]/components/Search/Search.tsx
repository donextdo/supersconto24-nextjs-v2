import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";

import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";
// import axios from "axios";
import socketIOClient from "socket.io-client";

interface Item {
  _id: string;
  product_name: string;
  unit_price: number;
  product_image: string;
  discount: number;
}

export const SearchItem = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isHide, setIsHide] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const search = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const response = await axios.post(
        `${baseUrl}/catelog/item/searchBySocket`,
        {
          query,
        }
      );
      const Products = response.data;

      setResults(Products);
    };

    const timeoutId = setTimeout(() => {
      search();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const sendView = (itemId: any) => {
    setIsHide(true);
    router.push(`/item-preview/${itemId}`);
    setQuery("");
    setIsHide(false);
  };

  return (
    <div className="flex flex-col xl:w-[500px] w-full md:w-full lg:w-96 place-content-center relative">
      <div className="flex relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="bg-gray-100 rounded-tl rounded-bl min-h-[60px] md:w-full lg-w-full w-1/2 pl-5 text-sm focus:outline-none "
        />
        <div className="bg-gray-100 rounded-br rounded-tr min-h-[60px] min-w-[60px]  flex items-center justify-center hover:cursor-pointer">
          <FiSearch
            type="submit"
            className="min-h-[36px] min-w-[24px] text-blue-900 "
          />
        </div>
      </div>

      {results.length > 0 && query !== "" && !isHide && (
        <div className="flex flex-col w-full md:w-full">
          <ul className="absolute bg-white border-2 border-gray-100 w-full z-50">
            {results.map((item: Item, index: number) => (
              <div
                className="flex flex-row items-center justify-between py-1"
                key={index}
              >
                <div className="flex items-center">
                  <li className="cursor-pointer text-start ml-2 border border-gray-100 py-1">
                    <Image
                      width={40}
                      height={40}
                      src={item.product_image}
                      alt={item.product_name}
                    />
                  </li>

                  <li
                    className="cursor-pointer text-start ml-2 flex-1 hover:underline text-sm font-medium"
                    onClick={() => sendView(item?._id)}
                  >
                    {item.product_name}
                  </li>
                </div>
                <div className="flex flex-col">
                  <li className="cursor-pointer text-end text-sm text-gray-400 font-semibold line-through mr-2 text-[14px] font-ff-headings">
                    RS {item.unit_price}
                  </li>
                  <li className="cursor-pointer text-end text-red-600 text-sm font-semibold mr-2 font-ff-headings">
                    Rs
                    {(
                      item.unit_price -
                      item.unit_price * (item.discount / 100)
                    ).toFixed(2)}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
