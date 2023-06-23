"use client";

import FilterSideBar from "../components/Filter/FilterSideBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterProduct = () => {
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
    <div className="  hidden md:hidden xl:block container mx-auto xl:px-40 px-5">
      <FilterSideBar
        categoryId={categoryId}
        subcategory={subcategory}
        minValue={minValue}
        maxValue={maxValue}
      />
    </div>
  );
};

export default FilterProduct;
