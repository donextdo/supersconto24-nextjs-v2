"use client";

import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import item1 from "../../../assets/item/item1.jpg";
import { GrFormClose } from "react-icons/gr";
import { IoCloseSharp, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { calSubTotal, removeAll } from "../cartSlice";
import axios from "axios";
// import baseUrl from "../../../../utils/baseUrl";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { RootState } from "@/app/[lang]/redux/store";
import baseUrl from "../../../../../../utils/baseUrl";
import CaPopup from "@/app/[lang]/components/NewProduct/CaPopup";
import CartCard from "./CartCard";
import { Product } from "../../product/product";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";

// import { PDFDocument, StandardFonts } from 'pdf-lib';
// import fs from 'fs';

interface CartType {
  image: string;
  title: string;
  subtotal: number;
}

const Cart: FC<CartType> = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const {getPrice} = useCurrency()

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cartItems");
    const parsedCartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
    setCartItems(parsedCartItems);
    console.log("view cart : ", parsedCartItems);
    console.log("view cart cart: ", cartItems);
  }, [count]);

  let totalAmount1 = useSelector((state: RootState) => state.cart.totalAmount);

  const [selectedValue, setSelectedValue] = useState("Ship");
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [townCity, setTownCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cartObj, setCartObj] = useState<any>([]);

  let id: any;
  if (typeof localStorage !== "undefined") {
    id = localStorage.getItem("id");
  }
  const [showInputs, setShowInputs] = useState(false);
  const router = useRouter();
  const [coupon, setCoupon] = useState("");

  const [shippingObj, setShippingObj] = useState({
    cartshippingFirstName: "",
    cartshippingLastName: "",
    cartshippingCompanyName: "",
    cartshippingcountry: "",
    cartshippingstreet: "",
    cartshippingapartment: "",
    cartshippingtown: "",
    cartshippingstate: "",
    cartshippingzipCode: "",
    cartshippingphone: "",
    cartshippingEmail: "",
  });

  useEffect(() => {
    console.log(cartItems);
    dispatch(calSubTotal(totalAmount));
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get(`${baseUrl}/users/${id}`);
      console.log(res.data);
      const data = res.data;

      setFirstName(data.shippingAddress.shippingFirstName);
      setLastName(data.shippingAddress.shippingLastName);
      setCompanyName(data.shippingAddress.shippingCompanyName);
      setCountry(data.shippingAddress.country);
      setStreetAddress(data.shippingAddress.street);
      setApartment(data.shippingAddress.apartment);
      setTownCity(data.shippingAddress.town);
      setState(data.shippingAddress.state);
      setZipCode(data.shippingAddress.zipCode);
      setPhone(data.shippingAddress.shippingphone);
      setEmail(data.shippingAddress.shippingEmail);
    } catch (err) {
      console.log(err);
    }
  }

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
    //console.log(cartItems);
    dispatch(calSubTotal(totalAmount));
  });

  const [total, setTotal] = useState(totalAmount + 5);

  function handleClickRadioAdd5() {
    setTotal(total + 5);
  }

  function handleClickRadioSubtract5() {
    setTotal(total - 5);
  }

  const handleClear = () => {
    dispatch(removeAll());
  };

  function handleClick() {
    setShowInputs(!showInputs);
  }

  const handleUpdateShipping = async () => {
    const newshippingObj = {
      cartshippingFirstName: firstName,
      cartshippingLastName: lastName,
      cartshippingCompanyName: companyName,
      cartshippingcountry: country,
      cartshippingstreet: streetAddress,
      cartshippingapartment: apartment,
      cartshippingtown: townCity,
      cartshippingstate: state,
      cartshippingzipCode: zipCode,
      cartshippingphone: phone,
      cartshippingEmail: email,
    };
    setShowInputs(false);
    setShippingObj(newshippingObj);
    console.log(shippingObj);
  };

  const handleCheckout = () => {
    console.log(shippingObj);

    // router.push({
    //     pathname: '/checkout',
    //     query: shippingObj,
    //   });

    //   <Link href={{
    //     pathname: '/checkout',
    //     query: shippingObj,
    //   }}> </Link>
  };

  const handlecoupon = async () => {
    try {
      const res = await axios.get(`${baseUrl}/coupons/getOne/${coupon}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = async () => {
    // const divElement = componentRef.current;
    // html2canvas(divElement).then((canvas:any) => {
    //   const imageData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   pdf.addImage(imageData, 'PNG', 0, 0);
    //   pdf.save('My Shopping List.pdf');
    // });
  };

  // const items: [string] =
  // JSON.parse(localStorage.getItem("cartItems")!) ?? [];
  useEffect(() => {
    fetchCart();
    console.log({ cartItems });
  }, [cartItems]);

  async function fetchCart() {
    if (cartItems.length > 0) {
      fetch(`${baseUrl}/catelog/item/find-list`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i: any) => i._id),
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          const cloneResponse = [...responseJson];
          console.log("cloneResponse : ", cloneResponse);
          cloneResponse.map((item) => {
            const itemone: any = cartItems.find((p) => p._id === item._id);
            item.cartQuantity = itemone?.quantity ? itemone?.quantity : 0;
          });
          setCartObj(groupBy([...cloneResponse], (v) => v.shop_id.shop_name));
        })
        .catch((error) => {
          console.error("error : ", error);
        });
    }
  }

  const groupBy = (
    x: any[],
    f: (arg0: any, arg1: any, arg2: any) => string | number
  ) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

  //   const categorizedProducts = cartObj.reduce((acc:any, product:any) => {
  //     const shopName = product.shop_id.shop_name;
  //     if (!acc[shopName]) {
  //       acc[shopName] = [];
  //     }
  //     acc[shopName].push(product);
  //     return acc;
  //   }, {});

  console.log("cartObj : ", cartObj);

  return (
    <div className="container mx-auto xl:px-40 px-5 mt-24 mb-20">
      <div>
        <section className="flex justify-between h-full">
          <div className="w-full h-full pb-10 bg-white py-2 px-4">
            {/* <div className="border border-white rounded-md space-y-4 py-4 px-4 bg-white">
                        <p className="text-sm">
                            Add <span className="text-primary font-semibold">$15.93</span> to
                            cart and get free shipping!
                        </p>
                        <hr className="h-2 rounded-md bg-primary" />
                    </div> */}

            <div className="mt-8" ref={componentRef}>
              {/* header */}
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-2 border-b border-[#71778e] pb-3">
                <div className="text-xs sm:col-span-2"></div>
                <div className="col-span-2 sm:col-span-4 text-xs text-[#71778e] font-semibold">
                  Product
                </div>
                <div className="text-xs text-[#71778e] font-semibold hidden sm:block">
                  Price
                </div>
                <div className="text-xs text-[#71778e] font-semibold sm:col-span-2">
                  Quantity
                </div>
                <div className="text-xs text-[#71778e] font-semibold hidden sm:block">
                  Subtotal
                </div>
                <div></div>
              </div>

              {/* products */}
              {Object.keys(cartObj).map((shop) => (
                <div key={shop}>
                  <div>{shop}</div>
                  {cartObj[shop]
                    .sort((a: any, b: any) =>
                      a.product_name.localeCompare(b.product_name)
                    )
                    .map((item: any, index: number) => (
                      <CartCard
                          getPrice={getPrice}
                        item={item}
                        key={index}
                        totalAmount={totalAmount}
                        setCount={setCount}
                      />
                    ))}
                </div>
              ))}
            </div>

            <section className="flex justify-between mt-6">
              <div className="inline-flex gap-2 w-full">
                <input
                  type="text"
                  className="h-11 bg-gray-100 rounded-md px-4 text-sm w-full md:w-72"
                  placeholder="Coupon code"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11 w-40"
                  onClick={handlecoupon}
                >
                  Apply coupon
                </button>
              </div>

              <div className="inline-flex gap-2">
                {/* <button className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11" onClick={handleDownload}>Download</button> */}
                <button
                  className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11 w-[104px] hidden md:block"
                  onClick={handleClear}
                >
                  Remove All
                </button>
              </div>
            </section>
          </div>
          <div>
            {/* sidebar cart totals */}
            <div className="w-80 border border-[#e4e5ee] p-4 rounded-md h-full hidden xl:block ml-8 bg-white">
              <h2 className="font-semibold mb-3">CART TOTALS</h2>
              <hr />
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                      Subtotal
                    </td>
                    <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                      {getPrice(totalAmount)}
                    </td>
                  </tr>
                  {/* <tr>
                                    <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">Coupon</td>
                                    <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">-$10</td>
                                </tr> */}
                  <tr>
                    <td rowSpan={4} className="text-[13px] font-semibold ">
                      Shipping
                    </td>
                    <td className="text-right text-[13px] py-3">
                      {/* Flat rate: <span className="inline-flex text-[#d51243] text-sm gap-2">$5.00
                                    <input type="radio" name="cart"  
                                    // onClick={handleClickRadioAdd5} 
                                    />
                                    </span> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[13px] pb-3 text-right">
                      <label className="inline-flex -gap-1">
                        <span className="mr-2">Local pickup</span>
                        <input
                          type="radio"
                          name="cart"
                          // onClick={handleClickRadioSubtract5}
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right text-[12.5px] pb-4">
                      Shipping to <span className="font-semibold">AL.</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right text-[13px]  text-[#2bbef9] pb-4">
                      <button onClick={handleClick}> Change address</button>
                      {showInputs && (
                        <div className="flex flex-col justify-end text-right">
                          <input
                            type="text"
                            className="w-full px-4 h-11 bg-gray-100 rounded-md mt-2 ml-2 pl-4 text-sm"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                          <input
                            type="text"
                            className="w-full px-4 h-11 bg-gray-100 rounded-md mt-2 ml-2 pl-4 text-sm"
                            placeholder="City"
                            value={townCity}
                            onChange={(e) => setTownCity(e.target.value)}
                          />
                          <input
                            type="text"
                            className="w-full px-4 h-11 bg-gray-100 rounded-md mt-2 ml-2 pl-4 text-sm"
                            placeholder="Postcode/Zip"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />

                          <button
                            className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11 w-[104px] mt-3"
                            onClick={handleUpdateShipping}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-y border-[#e4e5ee] text-[13px] font-semibold pb-4">
                      Total
                    </td>
                    <td className="border-y border-[#e4e5ee] text-right font-semibold text-xl py-4">
                      {getPrice(totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link
                href={{
                  pathname: "/checkout",
                  // query: { shippingObj: JSON.stringify(shippingObj) },
                }}
              >
                <button
                  className="bg-primary text-white py-2.5  rounded-md text-sm h-[50px] w-full text-center mt-4"
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        </section>

        <button
          className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11 w-full text-left mt-2 md:hidden"
          onClick={handleClear}
        >
          Remove All
        </button>

        {/* Cart Totals */}
        <div className="w-full border border-[#e4e5ee] mt-10 p-4 rounded-md xl:hidden">
          <h2 className="font-semibold mb-3">CART TOTALS</h2>
          <hr />
          <table className="w-full">
            <tbody>
              <tr>
                <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                  Subtotal
                </td>
                <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={4}
                  className="text-[13px] font-semibold border-b border-[#e4e5ee]"
                >
                  Shipping
                </td>
                <td className="text-right text-[13px] py-3">
                  Flat rate:{" "}
                  <span className="inline-flex text-[#d51243] text-sm gap-2">
                    $5.00
                    <input
                      type="radio"
                      name="vendor"
                      // onChange={handleRadioChange}
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="text-[13px] pb-3 text-right">
                  <label className="inline-flex -gap-1">
                    <span className="mr-2">Local pickup</span>
                    <input
                      type="radio"
                      name="vendor"
                      // onChange={handleRadioChange}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td className="text-right text-[12.5px] pb-4">
                  Shipping to <span className="font-semibold">AL.</span>
                </td>
              </tr>
              <tr>
                <td className="text-right text-[13px] border-b border-[#e4e5ee] text-[#2bbef9] pb-4">
                  Change address
                </td>
              </tr>
              <tr>
                <td className="border-b border-[#e4e5ee] text-[13px] font-semibold pb-4">
                  Total
                </td>
                <td className="border-b border-[#e4e5ee] text-right font-semibold text-xl py-4">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <Link href="/checkout">
            <button className="bg-primary text-white py-2.5  rounded-md text-sm h-[50px] w-full text-center mt-4">
              Proceed to checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
