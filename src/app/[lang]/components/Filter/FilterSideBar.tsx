"use client";

import { useEffect } from "react";
import Brand from "./Brand";
import Category from "./Category";
import PriceRange from "./PriceRange";
import FilteredProduct from "./FilteredProduct";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const FilterSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const minValue = searchParams.get("min_price");
  const maxValue = searchParams.get("max_price");
  const subcategory = searchParams.get("subCategories");
  console.log("page categoryId : ", categoryId);
  console.log("page minValue : ", minValue);
  console.log("page maxValue : ", maxValue);

  return (
    <div className="flex flex-row mb-9">
      <div className="lg:w-1/4 hidden lg:block">
        <div className="grid md:grid-cols-1 grid-cols-1 ">
          <Category categoryId={categoryId} />
          <PriceRange categoryId={categoryId} />
          <Brand categoryId={categoryId} />
        </div>
      </div>
      <div className="lg:w-3/4 md:w-full w-full mt-12 md:ml-9">
        <div className="lg:mt-12 md:mt-12 mt-12 cursor-pointer">
          <FilteredProduct
            categoryId={categoryId}
            // brand={brand}
            subcategory={subcategory}
            minValue={minValue}
            maxValue={maxValue}
            // inStock={inStock}
            // onSale={onSale}
            // perpage={perpage}
            // page={page}
            // orderby={orderby}
            // passgrid={passgrid}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
