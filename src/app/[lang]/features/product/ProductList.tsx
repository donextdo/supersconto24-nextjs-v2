'use client'

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { Product } from "./product";
import { ProductCard } from "./ProductCard";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Slider from "@/app/[lang]/components/Shared/Slider";


const ProductList = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.product.products
  ) as Product[];
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
  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-2 ">
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
      <div className="w-full shadow-lg">
        <Slider>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} exClass="min-w-[320px]" />
        ))}
        </Slider>
      </div>
    </>
  );
}

export default ProductList;