"use client";

import { useEffect } from "react";
import Brand from "./Brand";
import Category from "./Category";
import PriceRange from "./PriceRange";

const FilterSideBar = ({ categoryId }: any) => {
  useEffect(() => {
    console.log("filter side bar categoryId ? ", categoryId);
  });

  return (
    <div className="flex flex-row mb-9">
      <div className="lg:w-1/4 hidden lg:block">
        <div className="grid md:grid-cols-1 grid-cols-1 ">
          <Category categoryId={categoryId} />
          <PriceRange />
          <Brand categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
