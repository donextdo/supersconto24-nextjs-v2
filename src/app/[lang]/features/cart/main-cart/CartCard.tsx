import {
  calSubTotal,

} from "@/app/[lang]/features/cart/cartSlice";
import { Product } from "@/app/[lang]/features/product/product";
import { updateProductQuantity } from "@/app/[lang]/features/product/productSlice";
import { RootState } from "@/app/[lang]/redux/store";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { IoCloseSharp, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../../../../../../utils/baseUrl";

const CartCard = ({ item, index, totalAmount, setCount,getPrice }: any) => {
  const dispatch = useDispatch();
  //   const cartItems = useSelector((state: RootState) => state.cart.items);
  let totalAmount1 = useSelector((state: RootState) => state.cart.totalAmount);
  const [newprice, setNewPrice] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof localStorage !== "undefined") {
      const cartItemsString = localStorage.getItem("cartItems");
      const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
      return cartItemsArray || [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsString = localStorage.getItem("cartItems");
      const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];

      if (cartItemsArray) {
        setCartItems(cartItemsArray);
      }
    }
  }, []);

  const handleCheckboxChange = () => {};

  const handleIncrement = (product: Product) => {
    console.log({ product });
    const cartItemsString = localStorage.getItem("cartItems");
    const items = cartItemsString ? JSON.parse(cartItemsString) : [];
    console.log({ items });
    const itemIndex = items.findIndex((item: any) => item._id === product._id);
    console.log({ itemIndex });
    if (itemIndex != -1) {
      items[itemIndex].count += 1;
      localStorage.setItem("cartItems", JSON.stringify(items));
      setCartItems([...items]);
      setCount(items[itemIndex].count);
      console.log({ setCount });
    }
    dispatch(calSubTotal(12));
  };

  const handleDecrement = (product: Product) => {
    console.log({ product });
    const cartItemsString = localStorage.getItem("cartItems");
    const items = cartItemsString ? JSON.parse(cartItemsString) : [];

    const itemIndex = items.findIndex((item: any) => item._id === product._id);
    console.log({ itemIndex });
    if (itemIndex != -1) {
      if (items[itemIndex].count > 0) {
        // Check if count is greater than 0
        items[itemIndex].count -= 1;
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems([...items]);
        setCount(items[itemIndex].count);
      }
    }
    dispatch(calSubTotal(12));
  };
  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    const itemssssssssssssssss = cartItemsString
      ? JSON.parse(cartItemsString)
      : [];
  }, []);

  const handleDelete = (_id: string) => {
    const cartItemsString = localStorage.getItem('cartItems');
    const items = cartItemsString ? JSON.parse(cartItemsString) : [];


    const filteredCartItems = items.filter((item:any) => item._id !== _id);

    if (filteredCartItems.length == 0) {
      localStorage.removeItem("cartItems");
      dispatch(calSubTotal(12));
    } else {
      localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
      dispatch(calSubTotal(12));
    }
    // setCartObj(filteredCartItems)
    

  };

  useEffect(() => {
    let discountprice;
    if (typeof item.discount === "undefined") {
      discountprice = 0;
    } else {
      discountprice = item.unit_price * (item.discount / 100);
    }
    let newprice = item.unit_price - discountprice;
    setNewPrice(newprice);
    const p1: Product = cartItems.find((c1) => c1._id === item._id)!;
    setProductCount(p1.count);
    let ccc = item.count;
    let subtotal = p1.count * newprice;
    setSubtotal(subtotal);
    console.log("p1 : ", p1.count);
  }, [cartItems, subtotal, productCount]);

  return (
    <div
      className="grid grid-cols-4 sm:grid-cols-12 grid-2 gap-1 border-b border-[#71778e] py-3 h-28 items-center relative bg-white"
      key={index}
    >
      <div className="h-[95px] sm:col-span-2">
        <Image
          src={item.product_image}
          alt="item1"
          style={{
            objectFit: "contain",
            backgroundColor: "#e5e7eb",
            width: "100%",
            height: "100%",
          }}
          width={450}
          height={400}
        />
      </div>
      <div className="col-span-2 sm:col-span-4 text-sm  ">
        {item.product_name}
      </div>
      <div className="col-span-1 hidden sm:block">{getPrice(newprice)}</div>
      <div className="flex sm:col-span-2">
        <button
          className="p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center"
          onClick={() => handleDecrement(item)}
        >
          <FaMinus className="text-xs" />
        </button>
        <p className="text-sm flex items-center justify-center w-7 mx-1">
          {productCount || 0}
        </p>
        <button
          className="p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center"
          onClick={() => handleIncrement(item)}
        >
          <FaPlus className="text-xs " />
        </button>
      </div>
      <div className="col-span-2 hidden sm:block">{getPrice(subtotal)}</div>
      <div className="col-span-1 hidden sm:block">
        <button
          className="bg-[#e5e7eb] rounded-full p-1"
          onClick={() => handleDelete(item._id)}
        >
          <IoCloseSharp className="text-xl font-semibold text-black" />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
