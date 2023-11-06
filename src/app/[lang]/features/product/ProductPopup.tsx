// "use client";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { MainCategory, Product, SubCategory } from "./product";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";
import { FaStar } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import useAuthCheckHook from "@/app/[lang]/components/Hooks/useAuthCheck";
import { useRouter } from "next/navigation";


 
interface Review {
    rating: number;
    name: string;
    body: string;
    submittedDate: string;
    _id: string;
    reviewStatus: string;
    // other properties
}

const ProductPopup = ({ setProductPopup, proId }: any) => {
    const [data, setData] = useState<Product>({
        product_category: "",
        product_sub_category: "",
        _id: "",
        additionalInformation: "",
        back: "",
        brand: "",
        category: "",
        count: 0,
        description: "",
        discount: 0,
        front: "",
        imageArray: "",
        isAvailable: false,
        isBestSeller: false,
        isDiscount: false,
        isFavourite: false,
        isNewArrival: false,
        isOrganic: false,
        isRecommended: false,
        life: "",
        mfgDate: "",
        newprice: 0,
        price: 0,
        productQuantity: 0,
        product_description: "",
        product_image: "",
        product_name: "",
        quantity: 0,
        rating: 0,
        review: 0,
        side: "",
        skuNumber: "",
        speacialtag: "",
        tags: "",
        title: "",
        type: "",
        unit_price: 0,
    });
    const [isInWishlist, setIsInWishlist] = useState(data.isFavourite);
    const [allreview, setAllreview] = useState<Array<Review>>([]);
    const [tag, setTag] = useState([]);
    const [subCategory, setSubCategory] = useState<SubCategory>({
        _id: "",
        mainCategoryId: "",
        name: "",
    });
    const [mainCategory, setMainCategory] = useState<MainCategory>({
        _id: "",
        name: "",
    });
    const [count, setCount] = useState(1);
    const { getPrice } = useCurrency();
    const { cartItems, addProductToCart, removeProductFromCart } =
        useCartItemsHook();
        const {isLoggedIn, authUser, logOut} = useAuthCheckHook()
    const router = useRouter();    

    useEffect(() => {
        getCategory();
        getSubCategory();
        findSingleProduct();
        getReviews();
    }, []);

    async function findSingleProduct() {
        try {
            const res = await axios.get(`${baseUrl}/catelog/item/find/${proId}`);
            console.log(res);
            setData(res.data);
            setTag(res.data.tags);
        } catch (err) {
            console.log(err);
        }
    }
    async function getCategory() {
        try {
            const res = await axios.get(
                `${baseUrl}/category/categories/${data.product_category}`
            );
            console.log(res.data);
            setMainCategory(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    async function getSubCategory() {
        try {
            const res = await axios.get(
                `${baseUrl}/category/subcategories/${data.product_sub_category}`
            );
            console.log(res.data);
            setSubCategory(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getReviews() {
        try {
            const res = await axios.get(`${baseUrl}/reviews/getReview/${proId}`);
            setAllreview(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleIncrement = (product: Product) => {
        addProductToCart({ ...product, count: 1 });
        setCount((prevState) => prevState + 1);
    };

    const handleDecrement = (product: Product) => {
        if(count>1){
            removeProductFromCart({ ...product, count: 1 });
             setCount((prevState) => prevState - 1);
        }
        
    };

    const handleAddToCart = (data: any) => {
        addProductToCart({ ...data, count: 1 });

        Swal.fire({
            title:
                '<span style="font-size: 18px">Item has been added to your list</span>',
            width: 400,
            timer: 1500,
            // padding: '3',
            color: "white",
            background: "#00B853",
            showConfirmButton: false,
            heightAuto: true,
            position: "bottom-end",
        });
    };

    const { discountedPrice, newPrice } = useMemo(() => {
        let discountedPrice = 0;
        let newPrice = 0;

        if (data.discount) {
            discountedPrice = data.unit_price * (data.discount / 100);
            newPrice = data.unit_price - discountedPrice;
        } else {
            newPrice = data.unit_price;
        }

        return { discountedPrice, newPrice };
    }, [data]);

    const { yellowStars, grayStars } = useMemo(() => {
        const yellowStars = [];
        const grayStars = [];
        for (let i = 1; i <= data.review; i++) {
            yellowStars.push(<FaStar key={`yellow-star-${i}`} />);
        }
        for (let i = 1; i <= 5 - data.review; i++) {
            grayStars.push(<FaStar key={`gray-star-${i}`} />);
        }
        return { yellowStars, grayStars };
    }, [data]);

    const handleClose = () => {
        setProductPopup(false);
    };

    // const toggleWishlist = () => {
    //     // Toggle the isInWishlist state
    //     setIsInWishlist(!isInWishlist);
    
    //     // Send a request to your API to add/remove the product from the wishlist
    //     // You can use axios or any other method to perform this action
    
    //     if (isInWishlist) {
    //         // If the product is already in the wishlist, remove it
    //         // Example code to remove the product from the wishlist (you should adjust this as per your API):
    //         axios.delete(`${baseUrl}/users/wishList${proId}`)
    //             .then((response) => {
    //                 // Handle the success response
    //                 console.log(response.data);
    //             })
    //             .catch((error) => {
    //                 // Handle the error
    //                 console.error(error);
    //             });
    //     } else {
    //         // If the product is not in the wishlist, add it
    //         // Example code to add the product to the wishlist (you should adjust this as per your API):
    //         axios.post(`${baseUrl}/users/wishList${proId}`)
    //             .then((response) => {
    //                 // Handle the success response
    //                 console.log(response.data);
    //             })
    //             .catch((error) => {
    //                 // Handle the error
    //                 console.error(error);
    //             });
    //     }

    // };

    const handleWishlist = async (product: any) => {
        if (authUser._id) {
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
                if (isInWishlist) {
                    // If the product is already in the wishlist, remove it
                    const response = await axios.delete(
                        `${baseUrl}/users/wishList/${authUser._id}/${product._id}`
                    );
                    console.log(response.data); // do something with the response data
                } else {
                    // If the product is not in the wishlist, add it
                    const response = await axios.post(
                        `${baseUrl}/users/wishList/${authUser._id}`,
                        wishListObj
                    );
                    console.log(response.data); // do something with the response data
                }
    
                // Toggle the isInWishlist state
                setIsInWishlist(!isInWishlist);
    
                Swal.fire({
                    title: '<span style="font-size: 18px">Item has been added to your wishlist</span>',
                    width: 400,
                    timer: 1500,
                    color: "white",
                    background: "#00B853",
                    showConfirmButton: false,
                    heightAuto: true,
                    position: "bottom-end",
                });
            } catch (error) {
                console.log(error); // handle the error
            }
        } else {
            router.push("/account");
        }
    };
    


    console.log({ mainCategory, subCategory });
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900 bg-opacity-80">
            <div className="py-4 px-4 mx-2 flex flex-col relative bg-white shadow-md rounded-md w-full lg:w-[880px]">
                <div className="absolute top-4 right-10">
                    <button
                        onClick={handleClose}
                        className="bg-[#c2c2d3] rounded-full w-8 h-8 flex justify-center items-center"
                    >
                        <IoClose className="text-white" />
                    </button>
                </div>
                {data.product_name ? (
                    <div className=" bg-white  rounded-md px-6  ">
                        <div className="w-full mb-[1.875rem]">
                            <h1 className=" capitalize text-[1.5rem] font-semibold">
                                {data.product_name}
                            </h1>
                            <div className="flex flex-row bg-white text-[0.75rem] ">
                                <span className="text-gray-400 ">Brands: </span>
                                <span className="ml-1"> {data.brand}</span>

                                <div className="text-gray-400 mx-3">|</div>
                                <span className="text-gray-400 ">
                                    <div className="flex flex-row max-h-[18px] max-w-[130.49px] items-center justify-center">
                                        <p className="text-md text-yellow-400 flex">
                                            {yellowStars}
                                        </p>
                                        <p className="text-md text-gray-400 flex">{grayStars}</p>
                                    </div>
                                </span>
                                <span className="ml-1">
                                    <div className="uppercase  text-gray-400 font-semibold ml-2 text-[11px] flex items-center justify-center">
                                        {allreview.length} REVIEW
                                    </div>
                                </span>

                                <div className="text-gray-400 mx-3">|</div>
                                <span className="text-gray-400 ">SKU: </span>
                                <span className="ml-1">{data.skuNumber}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 w-full">
                            <div className="col-span-3">
                                <div className="relative  ">
                                    <div className="absolute max-w-[88.41px] max-h-[49px] flex flex-col items-start gap-1 p-2">
                                        {data?.discount && (
                                            <div className=" font-semibold max-w-[45.39px] max-h-[24px] px-4 py-1 bg-sky-400 text-white rounded text-[10px] flex items-center justify-center">
                                                {data.discount}%
                                            </div>
                                        )}

                                        {data?.speacialtag == "organic" && (
                                            <div className=" font-semibold px-2 py-1 bg-emerald-100 text-green-600 rounded-full text-[10px] flex items-center justify-center uppercase tracking-tighter">
                                                {data.speacialtag}
                                            </div>
                                        )}
                                        {data?.speacialtag == "Recommended" && (
                                            <div className=" font-semibold px-2 py-1 bg-gray-500 text-white rounded text-[10px] flex items-center justify-center uppercase tracking-tighter">
                                                {data.speacialtag}
                                            </div>
                                        )}
                                    </div>
                                    <div className="hover:cursor-pointer flex items-center justify-center px-12 ">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={data?.product_image}
                                            alt="mainImage"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full col-span-2">
                                <div className=" w-full">
                                    <div className=" flex flex-row">
                                        {data.discount ? (
                                            <span className="text-gray-400 text-sm line-through mr-2 my-1 font-[1.125rem]">
                                                {getPrice(data.unit_price) as unknown as ReactElement}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm  mr-2 my-1 font-[1.125rem]">
                                                {getPrice(data.unit_price) as unknown as ReactElement}
                                            </span>
                                        )}

                                        {data.discount && (
                                            <span className="my-1 text-red-700 text-lg font-semibold">
                        red                        {getPrice(newPrice)}
                                            </span>
                                        )}
                                    </div>
                                    {data?.quantity > 0 ? (
                                        <div className="font-medium py-2 px-2 mt-2 max-h-[26px] max-w-[68.35px] bg-emerald-100 text-green-600 rounded-full text-[.75rem] flex items-center justify-center uppercase tracking-tighter">
                                            In Stock
                                        </div>
                                    ) : (
                                        <div className="font-medium py-2 px-2 mt-2 max-h-[26px] w-[100px] bg-red-100 text-red-600 rounded-full text-[.75rem] flex items-center justify-center uppercase tracking-tighter">
                                            Out of Stock
                                        </div>
                                    )}
                                            <button

                                            onClick={handleWishlist}
                                            className={`mt-4 p-2 rounded-md ${
                                                isInWishlist ? "bg-red-500 text-white" : "bg-blue-900 text-white"
                                            }`}
                                            >
                                            <FiHeart className="h-4 w-4" />
                                            {isInWishlist ? "" : ""}
                                            </button>
                                            
                                    <div className="mt-6 text-[.8125rem]">
                                        <p className=" ">{data.product_description}</p>
                                    </div>
                                    <div className="">
                                        <div className=" max-w-[130px] lg:min-h-[44px] md:relative md:flex md:flex-row  lg:max-w-[130px] md:min-h-[44px] md:max-w-[130px] mt-10 flex flex-row">
                                            <div className=" w-full flex grid-cols-3 min-h-[44px] min-w-[130px]">
                                                <button
                                                    type="button"
                                                    className="hover:bg-yellow-400 px-4 border-gray-500 bg-gray-300 text-[25px]  rounded-full font-medium"
                                                    onClick={() => handleDecrement(data)}
                                                >
                                                    -
                                                </button>

                                                <div className=" flex items-center justify-center w-full text-center ">
                                                    {count}
                                                </div>

                                                <button
                                                    type="button"
                                                    className={`px-4 hover:bg-yellow-400 border-gray-500 bg-gray-300  text-[20px]   rounded-full  font-medium ${(data.quantity==count)?'pointer-events-none cursor-not-allowed':''}`}
                                                    onClick={() => handleIncrement(data)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className=" bg-blue-900 text-white min-h-[34px] min-w-[140px] rounded-full  ml-4"
                                                onClick={() => handleAddToCart(data)}
                                            >
                                                Add to list
                                            </button>

                                        </div>
                                    </div>
                                    <div className="max-h-[66px]  mt-6">
                                        {data.type && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2">
                                                    <BsCheckLg className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>
                                                <div className="">
                                                    Type: <span className="">{data.type}</span>
                                                </div>
                                            </div>
                                        )}
                                        {data.mfgDate && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2 ">
                                                    <BsCheckLg className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>

                                                <div className="">
                                                    MFG: <span>{data.mfgDate}</span>
                                                </div>
                                            </div>
                                        )}
                                        {data.life && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2">
                                                    <BsCheckLg className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>

                                                <div className="">
                                                    LIFE: <span className="">{data.life}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/*<hr className="max-w-[330px] mt-6"></hr>*/}
                                    <div className="mt-6 max-h-[72.8px] max-w-[308.33px]">
                                        {/*<div className="flex items-center justify-between max-h-[72.8px] mt-6">
                                            <span className="text-gray-400 text-xs capitalize">
                                                Category: <a
                                                href=""
                                                rel="tag"
                                                className="ml-2 text-gray-600 text-xs capitalize"
                                            >
                                                        {mainCategory.name}
                                                    </a>
                                            </span>
                                        <span className="text-gray-400 text-xs capitalize">
                                                Sub category: <a
                                                href=""
                                                rel="tag"
                                                className="ml-2 text-gray-600 text-xs capitalize"
                                            >
                                                        {subCategory.name}
                                                    </a>
                                            </span>
                                    </div>*/}

                                        {tag.length > 0 && (
                                            <div className="flex">
                                                <span className="text-gray-400 text-xs capitalize">
                                                    Tags:
                                                </span>
                                                <div className="flex">
                                                    {tag.map((tag: any, index: number) => (
                                                        <div key={index} className="flex">
                                                            <div className="text-xs">{index > 0 && ","}</div>
                                                            <a
                                                                href=""
                                                                rel="tag"
                                                                className="ml-2 text-gray-600 text-xs capitalize flex"
                                                            >
                                                                {tag.name}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                         </div>
                     </div>
                 </div>
            </div>
                ) : (
                    <div className="h-[50vh] flex justify-center items-center">
                        <h3>Loading...</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPopup;