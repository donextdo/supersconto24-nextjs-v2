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

    console.log("categoryId ", categoryId);
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
        const products = response.data;
        setProduct(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [categoryId, subcategory, minValue, maxValue]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {product.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FilteredProduct;
