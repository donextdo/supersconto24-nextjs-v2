"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import Category from "./Category";
import PriceRange from "./PriceRange";
import { useRouter } from "next/navigation";

const FilterSideBar = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50000);
  const [maxPriceValue, setMaxPriceValue] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (categoryId) {
  //     const fetchData = async () => {
  //       const response = await axios(
  //         `${baseUrl}/productDetails?categoryId=${categoryId}`
  //       );
  //       const products = response.data.products;

  //       // Extracting all the product prices
  //       const prices = products.map((product: any) => product.price);

  //       // Finding the maximum price
  //       const maxPrice = Math.max(...prices);

  //       // Rounding the maximum price
  //       let roundedPrice;

  //       roundedPrice = Math.ceil(maxPrice / 10) * 10;
  //       // setMaxPriceValue(roundedPrice);
  //       // setMaxValue(maxPriceValue);
  //       console.log("Rounded maximum price: ", roundedPrice);
  //     };

  //     fetchData();
  //   }
  // }, []);

  const router = useRouter();

  // useEffect(() => {
  //   const { query } = router;
  //   const minPrice = Number(query.min_price);
  //   const maxPrice = Number(query.max_price);

  //   if (!isNaN(minPrice) && !isNaN(maxPrice)) {
  //     setMinValue(minPrice);
  //     setMaxValue(maxPrice);
  //   }
  // }, [router.query]);
  const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();
    const newMinValue = parseInt(e.target.value);
    if (maxValue - newMinValue >= 0 && maxValue <= 50000) {
      if (newMinValue > parseInt(maxValue.toString())) {
        // Ignore invalid input
      } else {
        setMinValue(newMinValue);
        //   updatePriceQuery(newMinValue, maxValue);
      }
    } else {
      if (newMinValue < minValue) {
        setMinValue(newMinValue);
        //   updatePriceQuery(newMinValue, maxValue);
      }
    }
  };

  const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();
    const newMaxValue = parseInt(e.target.value);
    if (newMaxValue - minValue >= 0 && newMaxValue <= 50000) {
      if (newMaxValue < parseInt(minValue.toString())) {
        // Ignore invalid input
      } else {
        setMaxValue(newMaxValue);
        //   updatePriceQuery(minValue, newMaxValue);
      }
    } else {
      if (newMaxValue > maxValue) {
        setMaxValue(newMaxValue);
        //   updatePriceQuery(minValue, newMaxValue);
      }
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = `${(minValue / 50000) * 100}%`;
      progressRef.current.style.right = `${(1 - maxValue / 50000) * 100}%`;
    }
  }, [minValue, maxValue]);

  // const updatePriceQuery = (min: number, max: number) => {
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //         min_price: min,
  //         max_price: max,
  //       },
  //     },
  //     undefined,
  //     { scroll: false }
  //   );
  // };

  // const setPriceQuery = () => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: {
  //       ...router.query,
  //       min_price: minValue,
  //       max_price: maxValue,
  //     },
  //   });
  // };

  return (
    <div className="box-border max-h-[85px] max-w-[270px] lg:mt-12  ">
      <h4 className="max-h-[18px] max-w-[270px] uppercase tracking-[0] font-[600] text-[.9375rem] mb-[1.25rem] font-ff-headings">
        filter by price
      </h4>

      <div className="mb-4 max-h-[47px] max-w-[270px]">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-black rounded"
            ref={progressRef}
          ></div>
        </div>
        <div className="range-input relative">
          <input
            onChange={handleMin}
            type="range"
            value={minValue}
            min={0}
            step={10}
            max={50000}
            className="range-min absolute
               w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none "
            placeholder="Select a minimum value"
          />

          <input
            onChange={handleMax}
            type="range"
            value={maxValue}
            min={0}
            step={10}
            max={50000}
            className="range-max absolute
               w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            placeholder="Select a maximum value"
          />
        </div>
      </div>
      <div className="max-h-[47px] max-w[270px]">
        <div className="max-h-[18px] max-w[270px] grid gap-0 grid-cols-2 ">
          <div className="text-[.75rem]  mt-1 capitalize text-gray-400">
            price:
            <span className="text-black font-semibold">
              {" "}
              Rs {minValue}
            </span> -{" "}
            <span className="text-black font-semibold"> Rs {maxValue}</span>
          </div>
          <div className=" ml-16 ">
            <button
              type="button"
              className="uppercase text-[.75rem] ml-3 font-semibold"
              //onClick={setPriceQuery}
            >
              filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
