import { calSubTotal, removeItem, updateItemQuantity } from "@/app/[lang]/features/cart/cartSlice";
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

const CartCard = ({ item, index, totalAmount, setCount }: any) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items);
    let totalAmount1 = useSelector((state: RootState) => state.cart.totalAmount);




    const handleCheckboxChange = () => {

    }
    const handleIncrement = (product: Product) => {
        const cartItemsString = localStorage.getItem('cartItems');
        const items = cartItemsString ? JSON.parse(cartItemsString) : [];
      
        const itemIndex = items.findIndex((item:any) => item._id === product._id);
        
          if (itemIndex !=-1) {     
            items[itemIndex].count += 1;
            localStorage.setItem('cartItems', JSON.stringify(items));
            setCount(items[itemIndex].count)
            
          }
        dispatch(calSubTotal(totalAmount))
    };

    const handleDecrement = (product: Product) => {
        const cartItemsString = localStorage.getItem('cartItems');
        const items = cartItemsString ? JSON.parse(cartItemsString) : [];
      
        const itemIndex = items.findIndex((item:any) => item._id === product._id);
        console.log(itemIndex)
          if (itemIndex != -1) {
            if (items[itemIndex].count > 0) { // Check if count is greater than 0
                items[itemIndex].count -= 1;
                localStorage.setItem('cartItems', JSON.stringify(items));
                setCount(items[itemIndex].count);
              }
    
          }
        dispatch(calSubTotal(totalAmount))

    };
    useEffect(() => {
        console.log(cartItems)

    });

    const handleDelete = (_id: string) => {
        dispatch(removeItem(_id));
        dispatch(calSubTotal(totalAmount))


    }



    let discountprice;
    if (typeof item.discount === 'undefined') {
        discountprice = 0;
    } else {
        discountprice = item.unit_price * (item.discount / 100);
    }
    let newprice = item.unit_price - discountprice

    

    const p1: Product  = cartItems.find((c1) => c1._id === item._id) !

    let subtotal = 0
    console.log(p1)

    return (
        
        <div className="grid grid-cols-4 sm:grid-cols-12 grid-2 gap-1 border-b border-[#71778e] py-3 h-28 items-center relative bg-white" key={index} >
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
            <div className="col-span-1 hidden sm:block">{newprice.toFixed(2)}</div>
            <div className="flex sm:col-span-2">
                <button className="p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center" onClick={() => handleDecrement(item)}>
                    <FaMinus className="text-xs" />
                </button>
                <p className="text-sm flex items-center justify-center w-7 mx-1">{p1?.count
                    || 0}</p>
                <button className="p-2 bg-[#edeef5] rounded-full w-[30px] flex items-center" onClick={() => handleIncrement(item)}>
                    <FaPlus className="text-xs " />
                </button>
            </div>
            <div className="col-span-2 hidden sm:block">{subtotal.toFixed(2)}</div>
            <div className="col-span-1 hidden sm:block">
                <button className="bg-[#e5e7eb] rounded-full p-1" onClick={() => handleDelete(item._id)}><IoCloseSharp className="text-xl font-semibold text-black" /></button>
            </div>

        </div>
    );
}

export default CartCard;