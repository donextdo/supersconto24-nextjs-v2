'use client'

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { Product } from "./product";
import { ProductCard } from "./ProductCard";


const ProductList = () => {
   const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.product.products
  ) as Product[];
  useEffect(() => {
    dispatch(fetchProducts());

    console.log("data ", products);
    console.log(products);
  }, [dispatch]);
  return ( 
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            {products.slice(0,8).map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}

        </div>
   );
}
 
export default ProductList;