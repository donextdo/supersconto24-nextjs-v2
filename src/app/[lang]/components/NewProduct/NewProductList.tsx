'use client'
import { Product } from "@/app/[lang]/features/product/product";
import { fetchProducts } from "@/app/[lang]/features/product/productSlice";
import { AppDispatch, RootState } from "@/app/[lang]/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneProduct from "./OneProduct";

const NewProductList = () => {
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
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product)=>(
                <OneProduct key={product._id} product={product}/>
            ))}
        </div>
     );
}
 
export default NewProductList;