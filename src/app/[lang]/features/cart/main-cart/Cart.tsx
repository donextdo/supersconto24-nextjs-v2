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
import Swal from "sweetalert2";
import logoImg from "../../../../../../assets/logo/logo.png";
import CartSideBar from "./CartSideBar";
import useCartProductsHook from "@/app/[lang]/components/Hooks/useCartProductsHook";


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
    const { getPrice } = useCurrency()
    const { cartItems, cartAmount, addProductToCart, removeProductFromCart, fetchCart } = useCartItemsHook()
    const { cartProducts, cartProductsAmount, removeCartProductFromCart } = useCartProductsHook()
    const { isLoggedIn, authUser} = useAuthCheckHook()

    useEffect(() => {
        fetchCart()
        // fetchcartProduct()
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
        Swal.fire({
            
            text: 'Are you sure you want to remove all items from your cart?',
            icon: 'warning',
            showCancelButton: true, // Add this line to show the cancel button
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel', // Add this line to set the cancel button text
            confirmButtonColor: '#8DC14F',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('cartItems', '[]');
                dispatch(calSubTotal(12));
                setCartObj([]);
            }
        });
        // localStorage.setItem('cartItems', '[]');
        // dispatch(calSubTotal(12));
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

            // Load the logo image
            const logoImage = new Image();
            logoImage.src = logoImg.src; // Replace with the actual path to your logo image

            // Add the logo to the cloned component
            const logoContainer = document.createElement('div');
            logoContainer.style.position = 'absolute';
            logoContainer.style.top = '0';
            logoContainer.style.right = '0';
            logoContainer.style.width = '100px';
            logoContainer.style.height = '100px';
            logoContainer.appendChild(logoImage);
            clone.insertBefore(logoContainer, clone.firstChild);
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
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };

            const clone = componentRef.current.cloneNode(true) as HTMLDivElement;
            clone.style.paddingTop = '24px';

            // Load the logo image
            const logoImage = new Image();
            logoImage.src = logoImg.src; // Replace with the actual path to your logo image

            // Add the logo to the cloned component
            const logoContainer = document.createElement('div');
            logoContainer.style.position = 'absolute';
            logoContainer.style.top = '0';
            logoContainer.style.right = '0';
            logoContainer.style.width = '100px';
            logoContainer.style.height = '100px';
            logoContainer.appendChild(logoImage);
            clone.insertBefore(logoContainer, clone.firstChild);

            const buttons = clone.querySelectorAll('button');
            buttons.forEach((button) => button.remove());
            console.log(clone);
            html2pdf().from(clone).set(opt).save('shopping-list.pdf');
        }
    };

    const handleEmail = async () => {
        if (componentRef.current) {
            const opt = {
                margin: 0.5,
                filename: 'shopping-list.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };

            const clone = componentRef.current.cloneNode(true) as HTMLDivElement;

            // Load the logo image
            const logoImage = new Image();
            logoImage.src = logoImg.src; // Replace with the actual path to your logo image

            // Add the logo to the cloned component
            const logoContainer = document.createElement('div');
            logoContainer.style.position = 'absolute';
            logoContainer.style.top = '0';
            logoContainer.style.right = '0';
            logoContainer.style.width = '100px';
            logoContainer.style.height = '100px';
            logoContainer.appendChild(logoImage);
            clone.insertBefore(logoContainer, clone.firstChild);

            const buttons = clone.querySelectorAll('button');
            buttons.forEach((button) => button.remove());

            const pdfBlob = await html2pdf().from(clone).set(opt).output('blob');

            // Send the PDF blob to the backend
            const formData = new FormData();
            formData.append('pdf', pdfBlob, 'shopping-list.pdf');
            formData.append('email', authUser.email);

            // Replace 'http://backend-api-url' with your actual backend API URL
            fetch(`${baseUrl}/neworder/send-email`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    // Handle the response from the backend, e.g., show success message
                    console.log('Email sent successfully');
                })
                .catch((error) => {
                    // Handle errors, e.g., show error message
                    console.error('Error sending email:', error);
                });
        }
    };

    const groupBy = (
        x: any[],
        f: (arg0: any, arg1: any, arg2: any) => string | number
    ) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

    const getShopTotal = (products: any[]) => {
        console.log(products)
        const shopAmount = products.reduce((acc, item) => {
            if (!item.expired) {
                if (typeof item.discount === "undefined") {
                    console.log("no discount", item, acc)

                    acc += item.count * item.unit_price;
                } else {
                    acc +=
                        item.count *
                        (item.unit_price - item.unit_price * (item.discount / 100));
                    console.log("has discount", item, acc)
                }
            }
            return acc
        }, 0)

        return getPrice(shopAmount)
    }

    const handleIncrement = (product: Product) => {
        console.log(`handle increment =>  ${product._id}`)
        addProductToCart({ ...product, count: 1 })
    };

    const handleDecrement = (product: Product) => {
        console.log(`handle decrement =>  ${product._id}`)
        removeProductFromCart({ ...product, count: 1 })
    };

    const handleDelete = (product: Product) => {
        removeProductFromCart(product)
    };

    const handleDeleteFromCartSideBar = (product: Product) => {
        console.log(product)
        removeCartProductFromCart(product)
    };

    console.log("cartObj : ", cartObj);
    console.log("cartProducts : ", cartProducts);

    return (
        <div className="container mx-auto xl:px-40 px-5 mt-24 mb-20">
            <div>
                <h1 className="mb-8 text-2xl font-bold">Shopping List</h1>
                <section className="flex justify-between h-full">
                    <div className="w-full h-full pb-10 bg-white py-2 px-4">

                        <div className="mt-8" ref={componentRef}>
                            {/* header */}
                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-2 border-b border-[#71778e] pb-3 h-10">
                                <div className="sm:col-span-2 text-xs text-[#71778e] font-semibold">

                                </div>
                                <div className="text-xs text-[#71778e] font-semibold sm:col-span-2">Product</div>

                                <div className="text-xs text-[#71778e] font-semibold ">
                                    Price
                                </div>
                                <div className="text-xs text-[#71778e] font-semibold hidden sm:block">
                                    Discount
                                </div>
                                <div className="text-xs text-[#71778e] font-semibold sm:col-span-2 sm:text-center">
                                    Quantity
                                </div>
                                <div className="text-xs text-[#71778e] font-semibold sm:col-span-1 hidden sm:block">Available Quantity</div>
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

                                            let discountedPrice = 0
                                            let newPrice = 0
                                            if (item.discount) {
                                                discountedPrice = item.unit_price * (item.discount / 100);
                                                newPrice = item.unit_price - discountedPrice;
                                            } else {
                                                newPrice = item.unit_price;
                                            }
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
                                    onClick={handleDownload}><HiOutlineDocumentDownload className=" h-4 w-4" />
                                </button>
                                <button className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                                    onClick={handleEmail}><TfiEmail className=" h-4 w-4" /></button>

                                <button
                                    className="bg-[#233a95] text-white py-2.5 px-4 rounded-md text-xs h-11"
                                    onClick={handlePrint}
                                >
                                    <BsPrinter className=" h-4 w-4" />
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
                            <hr />
                            <table className="w-full">
                        <tbody>
                            {cartProducts.map((item: any, index: number) => (
                                <CartSideBar getPrice={getPrice} item={item} key={index} handleDelete={handleDeleteFromCartSideBar} />
                            ))}
                        </tbody>
                    </table>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                                            Subtotal
                                        </td>
                                        <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                                            {getPrice(cartProductsAmount)}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="border-y border-[#e4e5ee] text-[13px] font-semibold pb-4">
                                            Total
                                        </td>
                                        <td className="border-y border-[#e4e5ee] text-right font-semibold text-xl py-4">
                                            {getPrice(cartProductsAmount)}
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
                            {cartProducts.map((item: any, index: number) => (
                                <CartSideBar getPrice={getPrice} item={item} key={index} />
                            ))}
                            
                        </tbody>
                    </table>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="border-b border-[#e4e5ee] py-3 font-semibold text-[13px]">
                                    Subtotal
                                </td>
                                <td className="border-b border-[#e4e5ee] py-3 text-[15px] text-right">
                                    {getPrice(cartProductsAmount)}
                                </td>
                            </tr>

                            <tr>
                                <td className="border-b border-[#e4e5ee] text-[13px] font-semibold pb-4">
                                    Total
                                </td>
                                <td className="border-b border-[#e4e5ee] text-right font-semibold text-xl py-4">
                                    {getPrice(cartProductsAmount)}
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
