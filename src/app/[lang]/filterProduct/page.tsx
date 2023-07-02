import FilterSideBar from "../components/Filter/FilterSideBar";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: "Supersconto | Filter"
}
const FilterProduct = () => {

  return (
    <div className="  hidden md:hidden xl:block container mx-auto xl:px-40 px-5">
      <FilterSideBar/>
    </div>
  );
};

export default FilterProduct;
