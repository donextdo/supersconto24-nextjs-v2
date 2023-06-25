"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { fetchProducts } from "../../features/product/productSlice";
import { Product } from "../../features/product/product";
import { ProductCard } from "../../features/product/ProductCard";
import baseUrl from "../../../../../utils/baseUrl";
import axios from "axios";

const FilteredProduct = ({
  categoryId,
  minValue,
  maxValue,
  subcategory,
}: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.product.products
  ) as Product[];

  const [product, setProduct] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());

    console.log("data ", products);
    console.log(products);
  }, [dispatch]);

  const goToProduct = () => {
    // router.push("./filterProduct");
    router.push("./shop");
    // localStorage.clear();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${baseUrl}/filter?`;

        if (categoryId) {
          url += `categoryId=${categoryId}`;
        }
        if (subcategory) {
          url += `&subCategories=${subcategory}`;
        }

        if (minValue && maxValue) {
          url += `&min_price=${minValue}&max_price=${maxValue}`;
        }

        const response = await axios.get(url);
        const products = response.data.products;
        console.log("response.data: ", response.data.products);
        setProduct(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [categoryId, subcategory, minValue, maxValue]);

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-9 ">
          <div className="flex flex-col">
            <div className="uppercase font-semibold text-lg font-ff-headings lg:text-xl">
              Best Seller
            </div>
            <div className="text-xs text-gray-400">
              Do not miss the current offers until the end of March.
            </div>
          </div>
          {/* <div
            className=" p-2 h-9 flex flex-row rounded-full border border-gray-300 text-sm w-32 text-gray-500 px-4 justify-between cursor-pointer"
            onClick={goToProduct}
          >
            View All
            <span>
              <BsArrowRight className="text-lg"></BsArrowRight>
            </span>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FilteredProduct;
