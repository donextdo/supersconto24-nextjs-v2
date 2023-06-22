"use client";

import FilterSideBar from "../components/Filter/FilterSideBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  console.log("page categoryId : ", categoryId);
  return (
    <div className="  hidden md:hidden xl:block container mx-auto xl:px-40 px-5">
      <FilterSideBar categoryId={categoryId} />
    </div>
  );
};

export default FilterProduct;
