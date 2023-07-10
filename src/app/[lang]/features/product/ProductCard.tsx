import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import { Product } from "./product";
import Link from "next/link";
import ProductPopup from "./ProductPopup";
import Swal from "sweetalert2";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";
import useAuthCheckHook from "@/app/[lang]/components/Hooks/useAuthCheck";
import { useRouter } from "next/navigation";

interface Props {
    product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [productPopup, setProductPopup] = useState(false);
    const [proId, setProId] = useState("");
    const [count, setCount] = useState(0);
    const router = useRouter()

    const { getPrice } = useCurrency();
    const { cartItems, addProductToCart, removeProductFromCart } = useCartItemsHook()
    const {isLoggedIn, authUser, logOut} = useAuthCheckHook()

    useEffect(() => {
        const currentProduct = cartItems.find((item) => item._id === product._id)
        if (currentProduct) {
            setCount(currentProduct.count)
        } else {
            setCount(0)
        }
    }, [cartItems, product])


    const handleIncrement = (product: Product) => {
        addProductToCart({ ...product, count: 1 })
        setCount(prevState => prevState + 1)
    };

    const handleDecrement = (product: Product) => {
        removeProductFromCart({ ...product, count: 1 })
        setCount(prevState => prevState - 1)
    };

    const handleAddToCart = (product: Product) => {
        addProductToCart({ ...product, count: 1 })
        setCount(prevState => prevState + 1)

        Swal.fire({
            title:
                '<span style="font-size: 18px">Item has been added to your card</span>',
            width: 400,
            timer: 1500,
            color: "white",
            background: "#00B853",
            showConfirmButton: false,
            heightAuto: true,
            position: "bottom-end",
        });
    };

    const {discountedPrice, newPrice} = useMemo(() => {
        let discountedPrice = 0
        let newPrice = 0

        if (product.discount) {
            discountedPrice = product.unit_price * (product.discount / 100);
            newPrice = product.unit_price - discountedPrice;
        } else {
            newPrice = product.unit_price;
        }

        return {discountedPrice, newPrice}
    }, [product])

    const { yellowStars, grayStars } = useMemo(() => {
        const yellowStars = []
        const grayStars = []
        for (let i = 1; i <= product.review; i++) {
            yellowStars.push(<FaStar key={`yellow-star-${i}`} />);
        }
        for (let i = 1; i <= 5 - product.review; i++) {
            grayStars.push(<FaStar key={`gray-star-${i}`} />);
        }
        return { yellowStars, grayStars }

    }, [product])


    const handleWishlist = async (product: any) => {
        console.log(authUser._id)
        if(authUser._id){
            const wishListObj = {
                wishList: [
                  {
                    productId: product._id,
                    front: product.product_image,
                    title: product.product_name,
                    price: product.unit_price,
                    date: new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }),
                    quantity: product.quantity,
                  },
                ],
              };
    
            try {
                const response = await axios.post(`${baseUrl}/users/wishList/${authUser._id}`, wishListObj);
                console.log(response.data); // do something with the response data
            } catch (error) {
                console.log(error); // handle the error
            }
        }else{
            router.push("/account")
        }
        
    };

    const handlePopup = (product: any) => {
        setProductPopup(true);
        setProId(product);
    };

    console.log({ count })
    return (
        <>
            <div
                className="w-full min-h-[350px] mx-auto bg-white border border-gray-200  overflow-hidden relative group hover:drop-shadow-lg rounded-sm"
                key={product._id}
            >
                <div className="absolute max-w-[88.41px] max-h-[49px] flex flex-col items-start gap-1 p-2">
                    {product.discount && (
                        <div
                            className=" font-semibold max-w-[45.39px] max-h-[24px] px-4 py-1 bg-sky-400 text-white rounded text-[10px] flex items-center justify-center">
                            {product.discount as unknown as ReactElement}%
                        </div>
                    )}
                    {product.isRecommended && (
                        <div
                            className=" font-semibold px-2 py-1 bg-gray-500 text-white rounded text-[10px] flex items-center justify-center uppercase tracking-tighter">
                            Recommended
                        </div>
                    )}
                    {product.isOrganic && (
                        <div
                            className=" font-semibold px-2 py-1 bg-emerald-100 text-green-600 rounded-full text-[10px] flex items-center justify-center uppercase tracking-tighter">
                            organic
                        </div>
                    )}
                </div>
                <div className="max-w-[40px] max-h-[85px] ">
                    <button
                        className="absolute max-w-[24px] max-h-[24px] top-2 right-2 bg-white flex items-center justify-center rounded-full h-8 w-8 hover:cursor-pointer drop-shadow-lg md:invisible group-hover:visible md:group-hover:-translate-x-3 md:group-hover:ease-in transition duration-150 hover:bg-blue-900 group/icon2"
                        onClick={() => handlePopup(product._id)}
                    >
                        <SlSizeFullscreen className="h-[10px] w-[10px] fill-blue-900 group-hover/icon2:fill-white" />
                    </button>

                    <div
                        className={`absolute max-w-[24px] max-h-[24px] top-9 right-2 bg-white flex items-center justify-center rounded-full h-8 w-8 hover:cursor-pointer drop-shadow-lg md:invisible group-hover:visible md:group-hover:-translate-x-3 md:group-hover:ease-in transition duration-150 hover:bg-blue-900 group/icon1`}
                        onClick={() => handleWishlist(product)}
                    >
                        {product.isFavourite ? (
                            <FaHeart className="h-3 w-3 fill-blue-900 group-hover/icon1:fill-white" />
                        ) : (
                            <FiHeart className="h-3 w-3 text-blue-900 group-hover/icon1:text-white" />
                        )}
                    </div>
                </div>

                {/* Main Imagee */}
                <div className="h-[160px] w-auto hover:cursor-pointer m-4 ">
                    <Link href={`/item-preview/${product._id}`}>
                        <Image
                            src={product.product_image}
                            alt={product.title}
                            style={{
                                objectFit: "contain",
                                backgroundColor: "white",
                                width: "100%",
                                height: "100%",
                            }}
                            width={450}
                            height={400}
                        />
                    </Link>
                </div>

                {/* from product name to price */}
                <div className="mx-4 mb-1 max-h-[155.29px] max-w-[212.95] ">
                    <div
                        className="text-sm font-medium text-black hover:text-indigo-400  capitalize leading-tight hover:cursor-pointer line-clamp-2">
                        <Link href={`/item-preview/${product._id}`}>
                            {product.product_name}
                        </Link>
                    </div>

                    <div
                        className="my-1 font-[.6875rem] text-xs pt-2 text-green-600 uppercase font-semibold tracking-[.005em]">
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>

                    <div className="text-xs pt-2 flex flex-row items-center my-1">
                        {/* {stars} */}
                        <p className="text-md text-yellow-400 flex">{yellowStars}</p>
                        <p className="text-md text-gray-400 flex">{grayStars}</p>
                    </div>

                    <div className=" flex flex-row items-center">
                        {product.discount ?
                            <span className="text-gray-400 text-sm line-through mr-2 my-1 font-[1.125rem]">
                                {getPrice(product.unit_price) as unknown as ReactElement}
                            </span>
                            : <span className="text-gray-400 text-sm  mr-2 my-1 font-[1.125rem]">
                                {getPrice(product.unit_price) as unknown as ReactElement}</span>
                        }

                        {product.discount && (
                            <span className="my-1 text-red-700 text-lg font-semibold">{getPrice(newPrice)}</span>
                        )}

                    </div>
                </div>

                {/* add to cart and count */}
                <div
                    className="mx-4 border-black text-black py-2 px-4 mt-1 rounded-full md:invisible group-hover:visible md:group-hover:-translate-y-3 md:group-hover:ease-in transition duration-150">
                    {(count == undefined || count < 1) && (
                        <button
                            type="button"
                            className=" bg-primary text-white h-8  rounded-full w-full "
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to cart
                        </button>
                    )}

                    {count >= 1 && (
                        <div className="max-h-[34px] w-full flex grid-cols-3 h-10">
                            <button
                                type="button"
                                className="px-4 max-h-[34px] border border-gray-500 bg-slate-500 rounded-tl-3xl rounded-bl-3xl "
                                onClick={() => handleDecrement(product)}
                            >
                                -
                            </button>
                            <div className="max-h-[34px] flex items-center justify-center w-full text-center border-y">
                                {count || 0}
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
            {productPopup && (
                <ProductPopup setProductPopup={setProductPopup} proId={proId} />
            )}
        </>
    );
};