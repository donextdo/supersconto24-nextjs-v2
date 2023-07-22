import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdMenu } from "react-icons/md";
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
  const [viewSubCategoryLevelTwo, setviewSubCategoryLevelTwo] = useState<
    Array<Category>
  >([]);
  const [viewSubCategoryLevelThree, setviewSubCategoryLevelThree] = useState<
    Array<Category>
  >([]);
  const [viewSubCategoryLevelFour, setviewSubCategoryLevelFour] = useState<
    Array<Category>
  >([]);

  const [viewSubCategoryList, setviewSubCategoryList] = useState<
    Array<Category>
  >([]);
  const [viewSubCategoryLevelTwoList, setviewSubCategoryLevelTwoList] =
    useState<Array<Category>>([]);
  const [viewSubCategoryLevelThreeList, setviewSubCategoryLevelThreeList] =
    useState<Array<Category>>([]);
  const [viewSubCategoryLevelFourList, setviewSubCategoryLevelFourList] =
    useState<Array<Category>>([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategories, setActiveSubcategories] = useState(null);
  const [activeSubcategoriesLevelTwo, setActiveSubcategoriesLevelTwo] =
    useState(null);
  const [activeSubcategoriesLevelThree, setActiveSubcategoriesLevelThree] =
    useState(null);
  const [activeSubcategoriesLevelFour, setActiveSubcategoriesLevelFour] =
    useState(null);

  const [isHover, setIsHover] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);

  const toggleHome = () => {
    setHomeOpen(!homeOpen);
  };
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/category/categories`);
      setviewCategory(response.data.mainCategories);
      setviewSubCategory(response.data.subCategories);
      setviewSubCategoryLevelTwo(response.data.subCategoriesLevelTwo);
      setviewSubCategoryLevelThree(response.data.subCategoriesLevelThree);
      setviewSubCategoryLevelFour(response.data.subCategoriesLevelFour);
    };
    fetchData();
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

  const handleCategoryLevelTwoHover = (_id: any) => {
    const selectedCategoryLevelTwo = viewSubCategoryLevelTwo.filter(
      (category) => category.mainCategoryId === _id
    );

    if (selectedCategoryLevelTwo.length > 0) {
      setActiveSubcategories(_id);
      setviewSubCategoryLevelTwoList(selectedCategoryLevelTwo);
      setActiveArrow(true);
      console.log("sub level two: ", selectedCategoryLevelTwo);
    } else {
      setActiveSubcategories(null);
      setviewSubCategoryLevelTwoList([]);
      setActiveArrow(false);
    }
  };

  const handleCategoryLevelThreeHover = (_id: any) => {
    const selectedCategoryLevelThree = viewSubCategoryLevelThree.filter(
      (category) => category.mainCategoryId === _id
    );

    if (selectedCategoryLevelThree.length > 0) {
      setActiveSubcategoriesLevelTwo(_id);
      setviewSubCategoryLevelThreeList(selectedCategoryLevelThree);
      setActiveArrow(true);
      console.log("sub level two: ", selectedCategoryLevelThree);
    } else {
      setActiveSubcategoriesLevelTwo(null);
      setviewSubCategoryLevelThreeList([]);
      setActiveArrow(false);
    }
  };

  const handleCategoryLevelFourHover = (_id: any) => {
    const selectedCategoryLevelFour = viewSubCategoryLevelFour.filter(
      (category) => category.mainCategoryId === _id
    );

    if (selectedCategoryLevelFour.length > 0) {
      setActiveSubcategoriesLevelThree(_id);
      setviewSubCategoryLevelFourList(selectedCategoryLevelFour);
      setActiveArrow(true);
      console.log("sub level two: ", selectedCategoryLevelFour);
    } else {
      setActiveSubcategoriesLevelThree(null);
      setviewSubCategoryLevelFourList([]);
      setActiveArrow(false);
    }
  };

  const hasSubcategories = (categoryId: string) => {
    const selectedCategory = viewSubCategory.find(
      (category) => category.mainCategoryId === categoryId
    );

    return selectedCategory !== undefined;
  };

  const hasSubcategoriesLevelTwo = (categoryId: string) => {
    const selectedCategoryLevelTwo = viewSubCategoryLevelTwo.find(
      (category) => category.mainCategoryId === categoryId
    );
    return selectedCategoryLevelTwo !== undefined;
  };

  const hasSubcategoriesLevelThree = (categoryId: string) => {
    const selectedCategoryLevelThree = viewSubCategoryLevelThree.find(
      (category) => category.mainCategoryId === categoryId
    );
    return selectedCategoryLevelThree !== undefined;
  };

  const hasSubcategoriesLevelFour = (categoryId: string) => {
    const selectedCategoryLevelFour = viewSubCategoryLevelFour.find(
      (category) => category.mainCategoryId === categoryId
    );
    return selectedCategoryLevelFour !== undefined;
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
    setActiveSubcategories(null);
    setActiveSubcategoriesLevelTwo(null);
    setActiveSubcategoriesLevelThree(null);
    setActiveSubcategoriesLevelFour(null);
    setIsHover(false);
  };

  const handleSubCategoryLevel = (_id: any) => {
    console.log({ activeSubcategoriesLevelThree });
    if (!activeSubcategoriesLevelFour) {
      setActiveSubcategories(_id);
      setActiveSubcategoriesLevelTwo(_id);
      setActiveSubcategoriesLevelThree(_id);
      setActiveSubcategoriesLevelFour(_id);
    }
  };

  const getProductByCategory = async (_id: any) => {
    console.log("sub Category level two : ", _id);
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

  const redirectFilter = () => {
    router.push(`/filterProduct`);
  };

  return (
    <div className="">
      <button
        className="w-[214px] h-[50px] rounded-full border border-[#4BB62E] "
        onClick={toggleHome}
      >
        <div>
          <Link
            href="#"
            className="font-ff-headings text-[#898989] justify-between px-3 py-4 text-[13px] font-semibold flex "
          >
            {" "}
            <div>
              <MdMenu className="mx-2 text-xl " />
            </div>
            ALL CATEGORIES
            <div>
              <MdKeyboardArrowDown className="mx-2 text-xl " />
            </div>
          </Link>
        </div>
      </button>
      {homeOpen && (
        <div
          className="text-[13px] w-64 py-2 min-w-[17rem]   bg-white mt-2.5 border border-gray m-auto absolute p-3 z-30"
          onMouseLeave={handleCategoryLeave}
        >
          <ul className="relative">
            {viewCategory.map((category, index) => {
              return (
                <li key={index} className="list-item w-full flex-row pt-3">
                  <a
                    className={`block px-2 py-2  hover:text-[#4BB62E] group "
                    ${
                      activeCategory === category._id && isHover
                        ? "text-[#4BB62E]"
                        : "text-gray-500"
                    }`}
                    onMouseEnter={() => handleCategoryHover(category?._id)}
                    onClick={() => getProductByCategory(category?._id)}
                  >
                    <div className=" flex flex-row items-center justify-between hover:cursor-pointer">
                      <div>{category?.name} </div>
                      {hasSubcategories(category?._id) && (
                        <IoIosArrowForward className="text-gray-500" />
                      )}
                    </div>
                  </a>
                  {/* handle sub category level one */}
                  {activeCategory === category._id &&
                    viewSubCategoryList.length > 0 && (
                      <ul
                        className="text-[13px] py-2  p-3  bg-white border border-gray absolute ml-[258px] top-[-0.52rem] z-30 min-w-[17rem] min-h-[29.5rem]"
                        onMouseEnter={() => setIsHover(true)}
                      >
                        {viewSubCategoryList.map((subcategory, subIndex) => (
                          <li key={subIndex}>
                            <a
                              className="block px-2 py-2 pt-5 text-gray-500 hover:text-[#4BB62E] hover:cursor-pointer"
                              onClick={() =>
                                getProductByCategory(subcategory._id)
                              }
                              onMouseEnter={() =>
                                handleCategoryLevelTwoHover(subcategory?._id)
                              }
                            >
                              <div className=" flex flex-row items-center justify-between hover:cursor-pointer">
                                <div> {subcategory?.name} </div>
                                {hasSubcategoriesLevelTwo(subcategory?._id) && (
                                  <IoIosArrowForward className="text-gray-500" />
                                )}
                              </div>
                            </a>
                            {/* handle sub category level two */}
                            {activeSubcategories === subcategory._id &&
                              viewSubCategoryLevelTwoList.length > 0 && (
                                <ul
                                  className="text-[13px] py-2  p-3  bg-white border border-gray absolute ml-[258px] top-[-0.125rem] z-30 min-w-[17rem] min-h-[29.5rem]"
                                  onMouseEnter={() => setIsHover(true)}
                                >
                                  {viewSubCategoryLevelTwoList.map(
                                    (subcategory, subIndex) => (
                                      <li key={subIndex}>
                                        <a
                                          className="block px-2 py-2 pt-5 text-gray-500 hover:text-[#4BB62E] hover:cursor-pointer"
                                          onClick={() =>
                                            getProductByCategory(
                                              subcategory._id
                                            )
                                          }
                                          onMouseEnter={() => {
                                            handleCategoryLevelThreeHover(
                                              subcategory._id
                                            );
                                          }}
                                        >
                                          <div className=" flex flex-row items-center justify-between hover:cursor-pointer">
                                            <div> {subcategory?.name} </div>
                                            {hasSubcategoriesLevelThree(
                                              subcategory?._id
                                            ) && (
                                              <IoIosArrowForward className="text-gray-500" />
                                            )}
                                          </div>
                                        </a>
                                        {/* handle sub category level three category */}
                                        {activeSubcategoriesLevelTwo ===
                                          subcategory._id &&
                                          viewSubCategoryLevelThreeList.length >
                                            0 && (
                                            <ul
                                              className="text-[13px] py-2  p-3  bg-white border border-gray absolute ml-[258px] top-[-0.125rem] z-30 min-w-[17rem] min-h-[29.5rem]"
                                              onMouseEnter={() =>
                                                setIsHover(true)
                                              }
                                            >
                                              {viewSubCategoryLevelThreeList.map(
                                                (subcategory, subIndex) => (
                                                  <li key={subIndex}>
                                                    <a
                                                      className="block px-2 py-2 pt-5 text-gray-500 hover:text-[#4BB62E] hover:cursor-pointer"
                                                      onClick={() =>
                                                        getProductByCategory(
                                                          subcategory._id
                                                        )
                                                      }
                                                      onMouseEnter={() => {
                                                        handleCategoryLevelFourHover(
                                                          subcategory._id
                                                        );
                                                      }}
                                                    >
                                                      <div className=" flex flex-row items-center justify-between hover:cursor-pointer">
                                                        <div>
                                                          {" "}
                                                          {subcategory?.name}
                                                        </div>
                                                        {hasSubcategoriesLevelFour(
                                                          subcategory?._id
                                                        ) && (
                                                          <IoIosArrowForward className="text-gray-500" />
                                                        )}
                                                      </div>
                                                    </a>
                                                    {/* handle sub category level four */}
                                                    {activeSubcategoriesLevelThree ===
                                                      subcategory._id &&
                                                      viewSubCategoryLevelFourList.length >
                                                        0 && (
                                                        <ul
                                                          className="text-[13px] py-2  p-3  bg-white border border-gray absolute ml-[258px] top-[-0.125rem] z-30 min-w-[17rem] min-h-[29.5rem]"
                                                          onMouseEnter={() =>
                                                            setIsHover(true)
                                                          }
                                                        >
                                                          {viewSubCategoryLevelFourList.map(
                                                            (
                                                              subcategory,
                                                              subIndex
                                                            ) => (
                                                              <li
                                                                key={subIndex}
                                                              >
                                                                <a
                                                                  className="block px-2 py-2 pt-5 text-gray-500 hover:text-[#4BB62E] hover:cursor-pointer"
                                                                  onClick={() =>
                                                                    getProductByCategory(
                                                                      subcategory._id
                                                                    )
                                                                  }
                                                                  onMouseEnter={() => {
                                                                    handleSubCategoryLevel(
                                                                      subcategory._id
                                                                    );
                                                                  }}
                                                                >
                                                                  {
                                                                    subcategory?.name
                                                                  }
                                                                </a>
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      )}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
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
            <p
              className="hover:text-[#4BB62E] hover:cursor-pointer"
              onClick={redirectFilter}
            >
              Value Of the Day
            </p>
          </div>
          <div className="py-2 px-2">
            <p
              className="hover:text-[#4BB62E] hover:cursor-pointer"
              onClick={redirectFilter}
            >
              Top 100 Offers
            </p>
          </div>
          <div className="py-2 px-2">
            <p
              className="hover:text-[#4BB62E] hover:cursor-pointer"
              onClick={redirectFilter}
            >
              New Arrivals
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
