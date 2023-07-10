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
  brand,
}: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const products = useSelector(
  //   (state: RootState) => state.product.products
  // ) as Product[];

  const [products, setProducts] = useState<Product[]>([]);

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
        if (brand) {
          url += `&brands=${brand}`;
        }
        if (minValue && maxValue) {
          url += `&min_price=${minValue}&max_price=${maxValue}`;
        }

        const response = await axios.get(url);
        const products = response.data;
        console.log("response.data: ", response.data);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [categoryId, subcategory, minValue, maxValue, brand]);

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between mb-9 "></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <>No products found</>
        )}
      </div>
    </>
  );
};

export default FilteredProduct;
