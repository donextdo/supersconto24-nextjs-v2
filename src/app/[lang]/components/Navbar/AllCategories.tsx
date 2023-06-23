import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineStorage } from "react-icons/md";
import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  mainCategoryId: any;
  // any other properties
}
const AllCategories = () => {
  const [homeOpen, setHomeOpen] = useState(false);

  const [viewCategory, setviewCategory] = useState<Array<Category>>([]);
  const [viewSubCategory, setviewSubCategory] = useState<Array<Category>>([]);
  const [viewSubCategoryList, setviewSubCategoryList] = useState<
    Array<Category>
  >([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategories, setActiveSubcategories] = useState();
  const [isHover, setIsHover] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);

  const toggleHome = () => {
    setHomeOpen(!homeOpen);
  };
  const router = useRouter();
  const pathname = usePathname();
  // http://localhost:3000/v1/api/users/google/callback
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/category/categories`);
      setviewCategory(response.data.mainCategories);
      setviewSubCategory(response.data.subCategories);
    };
    fetchData();
    console.log("view category : ", viewCategory);
    console.log("view sub category : ", viewSubCategory);
  }, []);

  const handleCategoryHover = (_id: any) => {
    const selectedCategory = viewSubCategory.filter(
      (category) => category.mainCategoryId === _id
    );
    console.log(selectedCategory);
    if (selectedCategory.length > 0) {
      setActiveCategory(_id);
      setviewSubCategoryList(selectedCategory);
      setActiveArrow(true);
      console.log("sub : ", selectedCategory);
    } else {
      setActiveCategory(null);
      setviewSubCategoryList([]);
      setActiveArrow(false);
    }
  };

  const hasSubcategories = (categoryId: string) => {
    const selectedCategory = viewSubCategory.find(
      (category) => category.mainCategoryId === categoryId
    );
    return selectedCategory !== undefined;
  };
  const handleCategoryLeave = () => {
    setActiveCategory(null);
    setIsHover(false);
  };

  const handleSubCategoryHover = (_id: any) => {
    setActiveSubcategories(_id);
  };

  const getProductByCategory = async (_id: any) => {
    console.log("id : ", _id);
    setHomeOpen(false);
    router.push(`/filterProduct?categoryId=${_id}`);
  };

  useEffect(() => {
    if (pathname === "/en") {
      setHomeOpen(true);
      handleCategoryLeave();
    } else {
      setHomeOpen(false);
      handleCategoryLeave();
    }
  }, [pathname]);

  return (
    <div className="">
      <button
        className="w-[214px] h-[50px] rounded-full bg-[#4BB62E] "
        onClick={toggleHome}
      >
        <div>
          <Link
            href="#"
            className="font-ff-headings text-white justify-between px-3 py-4 text-[13px] font-semibold flex "
          >
            {" "}
            <div>
              <MdOutlineStorage className="mx-2 text-xl " />
            </div>
            ALL CATEGORIES
            <div>
              <MdKeyboardArrowDown className="mx-2 text-xl " />
            </div>
          </Link>
        </div>
      </button>
      {homeOpen && (
        <div className="text-[13px] w-64 py-2 min-w-[17rem] min-h-[32rem]  bg-white mt-2.5 border border-gray m-auto absolute p-3 z-30">
          <ul className="relative">
            {viewCategory.map((category, index) => {
              return (
                <li key={index} className="list-item w-full flex-row pt-3">
                  <a
                    href="#"
                    className={`block px-2 py-2  hover:text-[#4BB62E] group "
                    ${
                      activeCategory === category._id && isHover
                        ? "text-[#4BB62E]"
                        : "text-gray-500"
                    }`}
                    onMouseEnter={() => handleCategoryHover(category?._id)}
                    onClick={() => getProductByCategory(category?._id)}
                  >
                    <div className=" flex flex-row items-center justify-between">
                      <div>{category?.name} </div>
                      {hasSubcategories(category?._id) && (
                        <IoIosArrowForward className="text-gray-500" />
                      )}
                    </div>
                  </a>
                  {activeCategory === category._id &&
                    viewSubCategoryList.length > 0 && (
                      <ul
                        className="text-[13px] py-2  p-3  bg-white border border-gray absolute ml-[258px] top-[-0.52rem] z-30 min-w-[17rem] min-h-[32.5rem]"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={handleCategoryLeave}
                      >
                        {viewSubCategoryList.map((subcategory, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href="#"
                              className="block px-2 py-2 pt-5 text-gray-500 hover:text-[#4BB62E]"
                              onClick={() =>
                                getProductByCategory(subcategory._id)
                              }
                              onMouseEnter={() =>
                                handleSubCategoryHover(subcategory?._id)
                              }
                            >
                              {subcategory.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              );
            })}
          </ul>

          <hr className="my-2" />

          <div className="py-2 px-2">
            <p className="hover:text-[#4BB62E] ">Value Of the Day</p>
          </div>
          <div className="py-2 px-2">
            <p className="hover:text-[#4BB62E]">Top 100 Offers</p>
          </div>
          <div className="py-2 px-2">
            <p className="hover:text-[#4BB62E]">New Arrivals</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
