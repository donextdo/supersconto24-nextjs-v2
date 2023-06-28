import Image from "next/image";
import product from "../../../assets/product/product.jpg";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import cart from "../../../../../../assets/cart/Untitled.jpg";
import { useEffect, useState } from "react";
import { RootState } from "@/app/[lang]/redux/store";
import { calSubTotal } from "@/app/[lang]/features/cart/cartSlice";
import CartPopupCard from "@/app/[lang]/features/cart/popup-cart/CartPopupCard";
import { Product } from "../../product/product";

const CartPopup = ({ setCart }: any) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
    setCartItems(cartItemsArray);
  }, []);

  let totalAmount1 = useSelector((state: RootState) => state.cart.totalAmount);
  const [cartObj, setCartObj] = useState<any>([]);

  const dispatch = useDispatch();

  let totalSubtotal = 0;
  // cartItems.forEach(price  =>{
  //     totalSubtotal += price.subtotal
  // }
  // )
  console.log(totalSubtotal);

  let totalAmount = 0;
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    if (typeof item.discount === "undefined") {
      subtotal = item.count * (item.unit_price - item.unit_price * (0 / 100));
    } else {
      subtotal =
        item.count *
        (item.unit_price - item.unit_price * (item.discount / 100));
    }
    totalAmount += subtotal;
  }
  useEffect(() => {
    console.log(totalAmount);
    // totalAmount1 = totalAmount
    dispatch(calSubTotal(totalAmount));
  });
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="absolute w-[300px] max-h-[540px] bg-white right-0 z-50 px-5 py-4 shadow-lg">
          <div className="max-h-[260px] overflow-y-auto overflow-x-hidden">
            {cartItems.map((item: any, index: number) => (
              <CartPopupCard
                item={item}
                key={index}
                setCartItems={setCartItems}
              />
            ))}
          </div>
          <div className="flex justify-between mt-6 mb-4">
            <p className="text-[#c2c2d3] font-semibold text-[13px]">
              Subtotal:
            </p>
            <p className="text-lg text-[#ed174a]">${totalAmount.toFixed(2)}</p>
          </div>

          <Link href="/viewcart">
            <button className="bg-white border py-2 rounded-md text-sm h-[50px] w-full text-center">
              View cart
            </button>
          </Link>
          <Link href="/checkout">
            <button className="bg-primary text-white py-2 rounded-md text-sm h-[50px] w-full text-center mt-1">
              Checkout
            </button>
          </Link>
          <hr className="mt-3" />
          {/* <p className="text-xs text-center text-[#3e445a] mt-4">
          We reduce shipping prices to only 2.49 €!
        </p> */}
        </div>
      ) : (
        <div className="absolute w-[300px] max-h-[540px] min-h-[220px] bg-white right-0 z-50 px-5 py-4 shadow-lg">
          <div className="h-[160px] sm:col-span-2">
            <Image
              src={cart}
              alt="item1"
              style={{
                objectFit: "contain",
                backgroundColor: "white",
                width: "100%",
                height: "100%",
              }}
              width={450}
              height={400}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CartPopup;
