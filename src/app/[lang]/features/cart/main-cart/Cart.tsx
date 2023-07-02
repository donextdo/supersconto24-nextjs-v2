"use client";

import React, {FC, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {calSubTotal} from "../cartSlice";
import axios from "axios";
// import baseUrl from "../../../../utils/baseUrl";
import {useReactToPrint} from "react-to-print";
import baseUrl from "../../../../../../utils/baseUrl";
import CartCard from "./CartCard";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";
import {HiOutlineDocumentDownload} from "react-icons/hi";
import {TfiEmail} from "react-icons/tfi";
import {BsPrinter} from "react-icons/bs";
import html2pdf from "html2pdf.js";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import {Product} from "@/app/[lang]/features/product/product";
import useAuthCheckHook from "@/app/[lang]/components/Hooks/useAuthCheck";

// import { PDFDocument, StandardFonts } from 'pdf-lib';
// import fs from 'fs';

interface CartType {
    image: string;
    title: string;
    subtotal: number;
}

const Cart: FC<CartType> = () => {
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
    const [showInputs, setShowInputs] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [total, setTotal] = useState(0);
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
    const componentRef = useRef<any>(null);
    const {getPrice} = useCurrency()
    const {cartItems, cartCount, cartAmount, addProductToCart, removeProductFromCart, fetchCart} = useCartItemsHook()
    const {isLoggedIn, authUser, logOut} = useAuthCheckHook()

    useEffect(() => {
        fetchCart()
    }, [])


    useEffect(() => {
        if (isLoggedIn && authUser)
            getUserById(authUser._id);
    }, [authUser, isLoggedIn]);

    useEffect(() => {
        console.log(cartItems)
        if (cartItems.length > 0)
            setCartObj(groupBy([...cartItems], (v) => v.shop_id?.shop_name + " - " + v.shop_id?.address?.address));
        else
            setCartObj([])
    }, [cartItems])

    async function getUserById(id: string) {
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


    const handleClear = () => {
        localStorage.setItem('cartItems', '[]');
        dispatch(calSubTotal(12));
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
    };

    const handleCoupon = async () => {
        try {
            const res = await axios.get(`${baseUrl}/coupons/getOne/${coupon}`);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => {

            const clone = componentRef.current.cloneNode(true) as HTMLDivElement;

            const buttons = clone.querySelectorAll('button');
            buttons.forEach((button) => button.remove());

            return clone
        },
        pageStyle: `
      @page {
        margin: 20mm; /* Specify your desired margins */
      }
    `,
    });

    const handleDownload = async () => {
        if (componentRef.current) {
            const opt = {
                margin: 0.5,
                filename: 'shopping-list.pdf',
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {scale: 2},
                jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'},
            };

            const clone = componentRef.current.cloneNode(true) as HTMLDivElement;

            const buttons = clone.querySelectorAll('button');
            buttons.forEach((button) => button.remove());
            html2pdf().from(clone).set(opt).save('shopping-list.pdf');
        }
    };

    async function getCartItems() {
        if (cartItems.length > 0) {
            fetch(`${baseUrl}/catelog/item/find-list`, {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    items: cartItems.map((i: any) => i._id),
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    const cloneResponse = [...responseJson];
                    console.log("responseJson : ", responseJson);
                    cloneResponse.map((item) => {
                        const itemone: any = cartItems.find((p) => p._id === item._id);
                        item.count = itemone?.count ? itemone?.count : 0;
                    });
                    console.log("cloneResponse : ", cloneResponse, cartItems);

                    setCartObj(groupBy([...cloneResponse], (v) => v.shop_id.shop_name + " - " + v.shop_id.address.address));
                })
                .catch((error) => {
                    console.error("error : ", error);
                });
        } else {
            setCartObj([])
        }
    }

    const groupBy = (
        x: any[],
        f: (arg0: any, arg1: any, arg2: any) => string | number
    ) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

    const getShopTotal = (products: any[]) => {
        console.log(products)
        const shopAmount = products.reduce((acc, item) => {
            if (typeof item.discount === "undefined") {
                console.log("no discount", item, acc)

                acc += item.count * item.unit_price;
            } else {
                acc +=
                    item.count *
                    (item.unit_price - item.unit_price * (item.discount / 100));
                console.log("has discount", item, acc)
            }
            return acc
        }, 0)

        return getPrice(shopAmount)
    }

    const handleIncrement = (product: Product) => {
        console.log(`handle increment =>  ${product._id}`)
        addProductToCart({...product, count: 1})
    };

    const handleDecrement = (product: Product) => {
        console.log(`handle decrement =>  ${product._id}`)
        removeProductFromCart({...product, count: 1})
    };

    const handleDelete = (product: Product) => {
        removeProductFromCart(product)
    };

    console.log("cartObj : ", cartObj);

    return (
        <div className="container mx-auto xl:px-40 px-5 mt-24 mb-20">
            <div>
                <section className="flex justify-between h-full">
                    <div className="w-full h-full pb-10 bg-white py-2 px-4">

                        <div className="mt-8" ref={componentRef}>
                            {/* header */}
                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-2 border-b border-[#71778e] pb-3">
                                <div className="col-span-2 sm:col-span-4 text-xs text-[#71778e] font-semibold">
                                    Product
                                </div>
                                <div className="text-xs sm:col-span-1"></div>
                                <div className="text-xs text-[#71778e] font-semibold hidden sm:block">
                                    Price
                                </div>
                                <div className="text-xs text-[#71778e] font-semibold hidden sm:block">
                                    Discounted price
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
                                    <div className="text-sm font-semibold my-2">{shop}</div>
                                    {cartObj[shop]
                                        .sort((a: any, b: any) =>
                                            a.product_name.localeCompare(b.product_name)
                                        )
                                        .map((item: any, index: number) => {

                                            const discountedPrice = item.unit_price * (item.discount / 100);
                                            const newPrice = item.unit_price - discountedPrice;
                                            const subTotal = newPrice * item.count;

                                            return (
                                                <CartCard
                                                    getPrice={getPrice}
                                                    handleDelete={handleDelete}
                                                    handleDecrement={handleDecrement}
                                                    handleIncrement={handleIncrement}
                                                    item={item}
                                                    key={index}
                                                    price={getPrice(item.unit_price)}
                                                    newPrice={getPrice(newPrice)}
                                                    subTotal={getPrice(subTotal)}
                                                    count={item.count}
                                                />
                                            )
                                        })
                                    }
                                    <div className="text-sm my-2 border-b border-[#71778e] pb-2 flex justify-end">
                                        <span>Subtotal: {getShopTotal(cartObj[shop])}</span>
                                    </div>

                                </div>
                            ))}
                            <div className="text-sm my-2 border-b border-[#71778e] pb-2 flex justify-end">
                                <span>Grand Total: {getPrice(cartAmount)}</span>
                            </div>
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
                                    onClick={handleCoupon}
                                >
                                    Apply coupon
                                </button>
                            </div>

                            <div className="inline-flex gap-2">
                                <button className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                                        onClick={handleDownload}><HiOutlineDocumentDownload className=" h-4 w-4"/>
                                </button>
                                <button className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                                        onClick={handleDownload}><TfiEmail className=" h-4 w-4"/></button>

                                <button
                                    className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                                    onClick={handlePrint}
                                >
                                    <BsPrinter className=" h-4 w-4"/>
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
                        <div
                            className="w-80 border border-[#e4e5ee] p-4 rounded-md h-full hidden xl:block ml-8 bg-white">
                            <h2 className="font-semibold mb-3">CART TOTALS</h2>
                            <hr/>
                            <table className="w-full">
                                <tbody>
                                <tr>
                                    <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                                        Subtotal
                                    </td>
                                    <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                                        {getPrice(cartAmount)}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="text-[13px] pb-3 text-right">
                                        <label className="inline-flex -gap-1">
                                            <span className="mr-2">Local pickup</span>
                                            <input
                                                type="radio"
                                                name="cart"
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
                                        {getPrice(cartAmount)}
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
                    <hr/>
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                                Subtotal
                            </td>
                            <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                                {getPrice(cartAmount)}
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
                                {getPrice(cartAmount)}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <Link href="/checkout">
                        <button
                            className="bg-primary text-white py-2.5  rounded-md text-sm h-[50px] w-full text-center mt-4">
                            Proceed to checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
