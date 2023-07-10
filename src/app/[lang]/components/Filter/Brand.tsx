"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";
import { uniqBy } from "lodash";

const Brand = ({ categoryId }: any) => {
  const [brand, setBrand] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [checkedBrands, setCheckedBrands] = useState<any>({});
  const [brandPage, setBrandPage] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [showAllBrands, setShowAllBrands] = useState(false);
  const displayedBrands = showAllBrands ? brand : brand.slice(0, 10);
  const uniqueBrands = uniqBy(displayedBrands, "brand");
  const shouldShowSeeLess = showAllBrands && brand.length > 10;

  useEffect(() => {
    setCheckedBrands([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/catelog/item/main/sub/category/${categoryId}`
        );
        setBrand(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const brands = searchParams.get("brands");
    const queryBrands = brands;
    if (typeof queryBrands === "string") {
      const selectedBrands = queryBrands.split(",");
      const newCheckedBrands: { [key: string]: boolean } = {};
      selectedBrands.forEach((brandId: any) => {
        newCheckedBrands[brandId] = true;
      });
      setCheckedBrands(newCheckedBrands);
    }
  }, [categoryId]);

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams();
      params.set(name, String(value));
      return params.toString();
    },
    [searchParams]
  );

  const handleBrandClick = (brandId: any) => {
    const newCheckedBrands = { ...checkedBrands };
    newCheckedBrands[brandId] = !checkedBrands[brandId];
    setCheckedBrands(newCheckedBrands);
    const selectedBrands = Object.keys(newCheckedBrands).filter(
      (key) => newCheckedBrands[key]
    );
    const catId = searchParams.get("categoryId");
    const subCategories = searchParams.get("subCategories");
    const minP: number | null = Number(searchParams.get("min_price"));
    const maxP: number | null = Number(searchParams.get("max_price"));
    const queryString = createQueryString("brands", selectedBrands.join(","));

    let url = "/filterProduct";
    if (catId) {
      url += `?categoryId=${catId}`;
    }
    if (subCategories) {
      url += `&subCategories=${subCategories}`;
    }
    if (minP !== null && maxP !== null) {
      url += `&${createQueryString("min_price", minP)}&${createQueryString(
        "max_price",
        maxP
      )}`;
    }
    url += `&${queryString}`;

    router.push(url);
  };

  return (
    <div>
      {categoryId
        ? !isEmpty && (
            <div className="box-border max-h-[106px] max-w-[270px] lg:mt-12">
              <h4 className="max-h-[18px] max-w-[270px] uppercase tracking-[0] font-[600] text-[.9375rem] mb-[1.25rem] font-ff-headings">
                brands
              </h4>
              {uniqueBrands.map((category: any) => {
                const isChecked = checkedBrands[category._id];
                return (
                  <div
                    className="relative max-h-[59px] max-w-[270px] flex items-center hover:cursor-pointer"
                    key={category._id}
                  >
                    <div className="flex flex-row mb-3">
                      <input
                        type="checkbox"
                        id={category._id}
                        checked={isChecked}
                        onChange={() => handleBrandClick(category.brand)}
                        className="mr-4  min-h-[14px] min-w-[14px] hover:cursor-pointer accent-blue-900 hover:bg-blue-900"
                      />
                      <label
                        htmlFor={category._id}
                        className={`select-none text-[.8125rem]  font-medium hover:cursor-pointer capitalize ${
                          isChecked ? "text-blue-900" : "text-gray-500"
                        }`}
                      >
                        {category.brand}
                      </label>
                    </div>
                  </div>
                );
              })}
              {brand.length > 10 && (
                <div>
                  {shouldShowSeeLess ? (
                    <div
                      className="text-[.8125rem] font-medium text-blue-900 hover:underline hover:cursor-pointer"
                      onClick={() => setShowAllBrands(false)}
                    >
                      See Less
                    </div>
                  ) : (
                    <div
                      className="text-[.8125rem] font-medium text-blue-900 hover:underline hover:cursor-pointer"
                      onClick={() => setShowAllBrands(true)}
                    >
                      See All
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        : !isEmpty && (
            <div className="box-border max-h-[106px] max-w-[270px] lg:mt-12">
              <h4 className="max-h-[18px] max-w-[270px] uppercase tracking-[0] font-[600] text-[.9375rem] mb-[1.25rem] font-ff-headings">
                brands
              </h4>
              {/* {brandPage.map((brand: any, index: any) => {
                const isChecked = checkedBrands[brand.id];
                return (
                  <div
                    className="relative  max-h-[59px] max-w-[270px] items-center hover:cursor-pointer flex "
                    key={index}
                  >
                    <div className="mb-3  w-full flex flex-row justify-between ">
                      <div className=" flex flex-row">
                        <input
                          type="checkbox"
                          id={brand.brand}
                          checked={isChecked}
                          onChange={() => handleBrandClick(brand.brand)}
                          className="mr-4 min-h-[14px] min-w-[14px] hover:cursor-pointer accent-blue-900 hover:bg-blue-900"
                        />

                        <label
                          htmlFor={brand.brand}
                          className={`select-none text-[.8125rem] font-medium hover:cursor-pointer capitalize ${
                            isChecked ? "text-blue-900" : "text-gray-500"
                          }`}
                        >
                          {brand.brand}
                        </label>
                      </div>

                      <div className=" flex flex-row">
                        <span className="ml-2 text-[.8125rem] font-medium ">
                          ({brand.count})
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          )}
    </div>
  );
};

export default Brand;
