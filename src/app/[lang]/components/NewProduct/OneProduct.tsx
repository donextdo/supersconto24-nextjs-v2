import React, { ReactElement, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { FiHeart } from "react-icons/fi";
import { FC, useState } from "react";
import Image from "next/image";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
// import { addItem, calSubTotal, updateItemQuantity } from "../cart/cartSlice";
// import { updateProductQuantity } from "./productSlice";

import Link from "next/link";
// import ProductPopup from "./ProductPopup";
import axios from "axios";
import { Product } from "@/app/[lang]/features/product/product";
// import baseUrl from "../../../utils/baseUrl";
// import { http } from "../../../utils/request";

interface Props {
    product: Product;
  }

const OneProduct: FC<Props> = ({product}) => {
    const [isDiscount, setIsdiscount] = useState(false);
  const [productPopup, setProductPopup] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  let id:any;

if (typeof localStorage !== "undefined") {
  id = localStorage.getItem("id");
}


  useEffect(()=>{
    console.log(product)
  },[])

  useEffect(() => {
    if ((product.discount) >= 0) {
      setIsdiscount(true);
    }
  }, []);

  const handleIncrement = (product: Product) => {
    // setQuantity(quantity + 1);
    const newQuantity = (product.count || 0) + 1;
    // dispatch(updateItemQuantity({ itemId: product._id, count: newQuantity }));
    // dispatch(
    //   updateProductQuantity({ productId: product._id, count: newQuantity })
    // );
    // dispatch(calSubTotal(totalAmount))

  };

  const handleDecrement = (product: Product) => {
    // setQuantity(quantity - 1);
    const newQuantity = Math.max((product.count || 0) - 1, 0);
    // dispatch(updateItemQuantity({ itemId: product._id, count: newQuantity }));
    // dispatch(
    //   updateProductQuantity({ productId: product._id, count: newQuantity })
    // );
    // if (product.count === 1) {
    //   // dispatch(removeFromCart(id))
    //   // setIsAddToCart(false)
    // }
    // dispatch(calSubTotal(totalAmount))

  };

  const handleaddToCart = (product: Product) => {

    // dispatch(addItem(product));
    // const newQuantity = (product.count || 0) + 1;
    // dispatch(
    //   updateProductQuantity({ productId: product._id, count: newQuantity })
    // );
    // console.log(product._id);
    // dispatch(calSubTotal(totalAmount))

  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>
      <FaStar
        className={
          i < (product.rating as number) ? "text-yellow-500" : "text-gray-400"
        }
      />
    </span>
  ));

  let discountprice;
  discountprice = product.unit_price * (product.discount/100)
let newprice=product.unit_price-discountprice

const handleWishlist = async (product: any) => {
  // const wishlist = JSON.parse(localStorage.getItem('wishlist'));

  // const wishlistString = localStorage.getItem('wishlist');
  // const wishlist = wishlistString ? JSON.parse(wishlistString) : [];
  


  const whishListObj = {
    "whishList":[{
      productId: product._id,
      front: product.front,
      title: product.title,
      price: product.unit_price,
      date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
      }),
      quantity: product.quantity
    }]
  };
 
  try {
    // const response = await http.post(`/users/wishList/${id}`, whishListObj);
    // console.log(response.data); // do something with the response data
} catch (error) {
    console.log(error); // handle the error
}
 
}

let totalAmount = 0
    for (let i = 0; i < cartItems.length; i++) {
       let item = cartItems[i];
       let subtotal = item.count * (item.price-item.price*(item.discount/100));
       totalAmount += subtotal;
     }
     useEffect(() => {
      // dispatch(calSubTotal(totalAmount))
  });

  let proId
  const handlepopup = (product:any) => {
    setProductPopup(true)
    proId=product._id
    console.log(proId)
  }

  let yellowstars = [];
  let graystars=[];

for (let i = 1; i <= product.review; i++) {
  yellowstars.push(<FaStar />);
}
for (let i = 1; i <= (5-product.review); i++) {
  graystars.push(<FaStar />);
}
    return ( 
        <div
      className="w-full min-h-[350.24px] mx-auto bg-white border border-gray-200  overflow-hidden relative group hover:drop-shadow-lg rounded-sm"
      key={product._id}
    >
      <div className="absolute max-w-[88.41px] max-h-[49px] flex flex-col items-start gap-1 p-2">
        {/* {isDiscount && (
          <div className=" font-semibold max-w-[45.39px] max-h-[24px] px-4 py-1 bg-sky-400 text-white rounded text-[10px] flex items-center justify-center">
            {(product.discount as unknown as ReactElement) != undefined
              ? (product.discount as unknown as ReactElement)
              : 0}
            %
          </div>
        )}
        {product.isRecommended && (
          <div className=" font-semibold px-2 py-1 bg-gray-500 text-white rounded text-[10px] flex items-center justify-center uppercase tracking-tighter">
            Recommended
          </div>
        )}
        {product.isOrganic && (
          <div className=" font-semibold px-2 py-1 bg-emerald-100 text-green-600 rounded-full text-[10px] flex items-center justify-center uppercase tracking-tighter">
            organic
          </div>
        )} */}
      </div>
      <div className="max-w-[40px] max-h-[85px] ">
        <button className="absolute max-w-[24px] max-h-[24px] top-2 right-2 bg-white flex items-center justify-center rounded-full h-8 w-8 hover:cursor-pointer drop-shadow-lg md:invisible group-hover:visible md:group-hover:-translate-x-3 md:group-hover:ease-in transition duration-150 hover:bg-blue-900 group/icon2" onClick={() => handlepopup(product)}>
          <SlSizeFullscreen className="h-[10px] w-[10px] fill-blue-900 group-hover/icon2:fill-white" />
        </button>
        
        <div
          className={`absolute max-w-[24px] max-h-[24px] top-9 right-2 bg-white flex items-center justify-center rounded-full h-8 w-8 hover:cursor-pointer drop-shadow-lg md:invisible group-hover:visible md:group-hover:-translate-x-3 md:group-hover:ease-in transition duration-150 hover:bg-blue-900 group/icon1`} onClick={() => handleWishlist(product)}
        >
          {product.isFavourite ? (
            <FaHeart className="h-3 w-3 fill-blue-900 group-hover/icon1:fill-white" />
          ) : (
            <FiHeart className="h-3 w-3 text-blue-900 group-hover/icon1:text-white" />
          )}
        </div>
      </div>

      <div className=" max-h-[172.95px] min-h-[172.95px] min-w-[154.95px] w-full  hover:cursor-pointer my-2 flex items-center justify-center">
      <Link href={`/item-preview/${product._id}`}>  
        <Image
          width={172.95}
          height={154.95}
          //src={product.front as string}
          src={product.product_image}
          alt={product.title}
          //alt="Man looking at item at a store"
        />
          </Link>

      </div>
      <div className="mx-5 mb-1 max-h-[155.29px] max-w-[212.95] ">
        <div className="text-sm font-medium text-black hover:text-indigo-400  capitalize leading-tight hover:cursor-pointer line-clamp-2">
      <Link href={`/item-preview/${product._id}`}>  

          {product.product_name}
          </Link>

        </div>
        <div className="my-1 font-[.6875rem] text-xs pt-2 text-green-600 uppercase font-semibold tracking-[.005em]">
          {product.quantity>0 ? "In Stock" : "Out of Stock"}
        </div>
        <div className="text-xs pt-2 flex flex-row items-center my-1">
          {/* {stars} */}
          <p className="text-md text-yellow-400 flex">{yellowstars}</p>
        <p className="text-md text-gray-400 flex">{graystars}</p>
        </div>
        <div className=" flex flex-row items-center">
          {isDiscount && (
            <span className="text-gray-400 text-sm line-through mr-2 my-1 font-[1.125rem]">
              ${product.unit_price.toFixed(2) as unknown as ReactElement}
            </span>
          )}
          <span className="my-1 text-red-700 text-lg font-semibold">
            ${newprice.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mx-1 border-black text-black py-2 px-4 mt-1 rounded-full md:invisible group-hover:visible md:group-hover:-translate-y-3 md:group-hover:ease-in transition duration-150">
        { (product.count ==undefined || product.count<1) && (
          <button
            type="button"
            className=" bg-blue-900 text-white h-8  rounded-full w-full "
            onClick={() => handleaddToCart(product)}
          >
            Add to cart
          </button>
        )}

        {product.count >= 1 && (
          <div className="max-h-[34px] w-full flex grid-cols-3 h-10">
            <button
              type="button"
              className="px-4 max-h-[34px] border border-gray-500 bg-slate-800 rounded-tl-3xl rounded-bl-3xl "
              onClick={() => handleDecrement(product)}
            >
              -
            </button>
            <div className="max-h-[34px] flex items-center justify-center w-full text-center border-y">
              {product.count || 0}
            </div>
            <button
              type="button"
              className="px-4 max-h-[34px] border border-gray-500 bg-yellow-500 rounded-br-3xl rounded-tr-3xl "
              onClick={() => handleIncrement(product)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
     );
}
 
export default OneProduct;