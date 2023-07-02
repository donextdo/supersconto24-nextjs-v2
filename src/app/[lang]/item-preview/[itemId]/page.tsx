'use client'
import {
    FaFacebookF,
    FaLinkedin,
    FaPinterest,
    FaReddit,
    FaShippingFast,
    FaStar,
    FaTwitter,
    FaWhatsapp
} from "react-icons/fa";
import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {GiMedicinePills} from "react-icons/gi";
import {BsCheckLg} from "react-icons/bs";
import axios from "axios";
import {MainCategory, Product, SubCategory} from "../../features/product/product";
import baseUrl from "../../../../../utils/baseUrl";
import Description from "../../components/ViewItem/Details/Description";
import Review from "../../components/ViewItem/Details/Review";
import AdditionalInformation from "../../components/ViewItem/Details/AdditionalInformation";
import Swal from "sweetalert2";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import useCurrency from "@/app/[lang]/components/Hooks/useCurrencyHook";

// interface ItemData {
//     description: string;
//     quantity: number;
//     price: number;
//     title:string;
//     // any other properties
//   }
interface IProps {
    params: {
        itemId: string;
    };
}

const ItemPages = ({params}: IProps) => {
    const itemId = params.itemId
    const [data, setData] = useState<Product>({
        _id: "",
        isRecommended: false,
        isDiscount: false,
        isOrganic: false,
        isFavourite: false,
        discount: 0,
        rating: 0,
        product_category: "",
        product_sub_category: "",
        front: "",
        back: "",
        side: "",
        title: "",
        isAvailable: false,
        price: 0,
        quantity: 0,
        brand: "",
        description: "",
        productQuantity: 0,
        skuNumber: "",
        count: 0,
        newprice: 0,
        type: "",
        review: 0,
        mfgDate: "",
        life: "",
        category: "",
        tags: "",
        speacialtag: "",
        additionalInformation: "",
        isBestSeller: false,
        isNewArrival: false,
        imageArray: "",
        product_name: "",
        product_description: "",
        unit_price: 0,
        product_image: ""
    });
    const [mainCategory, setMainCategory] = useState<MainCategory>({_id: "", name: ""})
    const [subCategory, setSubCategory] = useState<SubCategory>({_id: "", mainCategoryId: "", name: ""})
    const [isColor, setIsColor] = useState(1);
    const [tag, setTag] = useState([]);
    const [allreview, setAllreview] = useState<Array<Review>>([]);
    const [categoryName, setcategoryname] = useState();
    const [count, setCount] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {cartItems, addProductToCart, removeProductFromCart} = useCartItemsHook()
    const {getPrice} = useCurrency()


    useEffect(() => {
        getCategory();
        getSubCategory();
        getReviews();

    }, []);


    useEffect(() => {
        findSingleProduct();
    }, [itemId]);

    async function findSingleProduct() {
        try {
            const res = await axios.get(`${baseUrl}/catelog/item/find/${itemId}`);
            console.log(res)
            setData(res.data);
            setTag(res.data.tags)

        } catch (err) {
            console.log(err);
        }
    }

    async function getCategory() {
        try {
            const res = await axios.get(`${baseUrl}/category/categories/${data.product_category}`);
            console.log(res.data)
            setMainCategory(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getSubCategory() {
        try {
            const res = await axios.get(`${baseUrl}/category/subcategories/${data.product_sub_category}`);
            console.log(res.data)
            setSubCategory(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getReviews() {
        try {
            const res = await axios.get(`${baseUrl}/reviews/getReview/${itemId}`);
            setAllreview(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    let totalReviewCount = 0;

    for (let i = 0; i < allreview.length; i++) {
        if (allreview[i].reviewStatus === 'approved') {
            totalReviewCount += allreview[i].rating;
        }
    }

    console.log(totalReviewCount);

    let averageReviewCount = 0;
    const approvedReviews = allreview.filter(review => review.reviewStatus === 'approved');
    const approvedReviewsLength = approvedReviews.length;

    if (approvedReviewsLength > 0) {
        averageReviewCount = Math.round(totalReviewCount / approvedReviewsLength);
    }

    console.log(averageReviewCount);

    const {yellowStars, grayStars} = useMemo(() => {
        const yellowStars = []
        const grayStars = []
        for (let i = 1; i <= data.review; i++) {
            yellowStars.push(<FaStar key={`yellow-star-${i}`}/>);
        }
        for (let i = 1; i <= 5 - data.review; i++) {
            grayStars.push(<FaStar key={`gray-star-${i}`}/>);
        }
        return {yellowStars, grayStars}

    }, [data])

    const handleIncrement = (product: Product) => {
        addProductToCart({...product, count: 1})
        setCount(prevState => prevState + 1)
    };

    const handleDecrement = (product: Product) => {
        removeProductFromCart({...product, count: 1})
        setCount(prevState => prevState - 1)
    };


    const handleAddToCart = (data: any) => {
        addProductToCart({...data, count: 1})

        Swal.fire({
            title:
                '<span style="font-size: 18px">Item has been added to your card</span>',
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


    const handleChange = (id: any) => {
        setIsColor(id);
    };


    const {discountedPrice, newPrice} = useMemo(() => {
        const discountedPrice = data.unit_price * (data.discount / 100);
        const newPrice = data.unit_price - discountedPrice;
        return {discountedPrice, newPrice}
    }, [data])

    const encodedUrl = encodeURIComponent(`${baseUrl}/item-preview/${itemId}`);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    const pinterestShareUrl = `https://pinterest.com/pin/create/bookmarklet/?url=${encodedUrl}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodedUrl}`;

    const facebookShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            facebookShareUrl,
            "facebook-share-dialog",
            "width=626,height=436"
        );
    };

    const twitterShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            twitterShareUrl,
            "twitter-share-dialog",
            "width=626,height=436"
        );
    };

    const pinterestShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            pinterestShareUrl,
            "pinterest-share-dialog",
            "width=626,height=436"
        );
    };

    const linkedinShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            linkedinShareUrl,
            "linkedin-share-dialog",
            "width=626,height=436"
        );
    };

    const redditShareClick = (e: any) => {
        e.preventDefault();
        window.open(redditShareUrl, "reddit-share-dialog", "width=626,height=436");
    };

    const whatsappShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            whatsappShareUrl,
            "whatsapp-share-dialog",
            "width=626,height=436"
        );
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const breadcrumbs = [
        {title: "Home", url: "/"},
        {title: `${categoryName}`, url: `/item-preview/${itemId}`},
        {title: `${data.product_name}`},
    ];

    const MAX_TITLE_LENGTH = 20; // Set your desired character limit
    const [expanded, setExpanded] = useState(false);

    const titleToDisplay = expanded ? data.product_name : data.product_name?.substring(0, MAX_TITLE_LENGTH) + "...";
    return (
        <>
            <div className="bg-[#f7f8fd] ">
                <div className="container mx-auto xl:px-40 px-5 m-8 py-6 ">
                    <div className=" pb-3">
                        {/* <Breadcrumbs crumbs={breadcrumbs}></Breadcrumbs> */}
                    </div>
                    {/* working one */}
                    <div className=" bg-white drop-shadow rounded-md px-6 pt-10 mt-2 ">
                        <div className="w-full mb-[1.875rem]">
                            <h1 className=" capitalize text-[1.5rem] font-semibold "
                                onClick={() => setExpanded(!expanded)}>
                                {data.product_name.length > 20 ? titleToDisplay : data.product_name}
                            </h1>
                            <div className="flex flex-row bg-white text-[0.75rem] ">
                                <span className="text-gray-400 ">Brands: </span>
                                <span className="ml-1"> {data.brand}</span>

                                <div className="text-gray-400 mx-3">|</div>
                                <span className="text-gray-400 ">
                                    <div
                                        className="flex flex-row max-h-[18px] max-w-[130.49px] items-center justify-center">
                                        <p className="text-md text-yellow-400 flex">
                                            {yellowStars}
                                        </p>
                                        <p className="text-md text-gray-400 flex">{grayStars}</p>
                                    </div>
                                </span>
                                <span className="ml-1">
                                    <div
                                        className="uppercase  text-gray-400 font-semibold ml-2 text-[11px] flex items-center justify-center">
                                        {allreview.length} REVIEW
                                    </div>
                                </span>

                                <div className="text-gray-400 mx-3">|</div>
                                <span className="text-gray-400 ">SKU: </span>
                                <span className="ml-1">{data.skuNumber}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-7 w-full min-h-[600px]">
                            <div className="col-span-3">
                                <div className="relative  max-h-[579.2px] max-w-[466.66px] ">
                                    <div
                                        className="absolute max-w-[88.41px] max-h-[49px] flex flex-col items-start gap-1 p-2">
                                        {data?.discount && (
                                            <div
                                                className=" font-semibold max-w-[45.39px] max-h-[24px] px-4 py-1 bg-sky-400 text-white rounded text-[10px] flex items-center justify-center">
                                                {data.discount as unknown as ReactElement}%

                                            </div>
                                        )}
                                        {data?.isRecommended && (
                                            <div
                                                className=" font-semibold px-2 py-1 bg-gray-500 text-white rounded text-[10px] flex items-center justify-center uppercase tracking-tighter">
                                                Recommended
                                            </div>
                                        )}
                                        {data?.speacialtag == "organic" && (
                                            <div
                                                className=" font-semibold px-2 py-1 bg-emerald-100 text-green-600 rounded-full text-[10px] flex items-center justify-center uppercase tracking-tighter">
                                                {data.speacialtag}
                                            </div>
                                        )}
                                        {data?.speacialtag == "Recommended" && (
                                            <div
                                                className=" font-semibold px-2 py-1 bg-gray-500 text-white rounded text-[10px] flex items-center justify-center uppercase tracking-tighter">
                                                {data.speacialtag}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="hover:cursor-pointer flex items-center justify-center px-12 "
                                        onClick={openModal}
                                    >
                                        <img
                                            width={390}
                                            height={436}
                                            src={data.product_image}
                                            alt="mainImage"
                                        />
                                    </div>
                                    {/* <div className="flex gap-2 justify-center">
                                        <button className="arrow left" onClick={prevSlide}>
                                            <MdArrowBackIos />
                                        </button>
                                        <div className="flex items-center justify-center row min-h-[63px] max-w-[421.2px] md:min-h-[67px] md:max-w-[444.66px]">
                                            {combinedArray.slice(currentSlide, currentSlide + 3).map((photo:any, index:number) => (
                                                <div
                                                key={index}
                                                    className={`flex items-center justify-center min-w-[67px] min-h-[67px] lg:min-w-[67px] lg:min-h-[67px] md:min-w-[94.4px] md:min-h-[94.4px] border ${selectedImage === photo
                                                        ? "border-gray-500"
                                                        : "border-gray-200"
                                                        } mr-2 hover:cursor-pointer`}
                                                        onClick={() => handleImageClick(currentSlide + index)}

                                                >
                                                    {!hideSideImage ? (
                                                        <img
                                                            width={67}
                                                            height={67}
                                                            src={photo}
                                                            alt="Man looking at item at a store"
                                                        />
                                                    ) : (
                                                        <img
                                                            width={67}
                                                            height={67}
                                                            src={photo}
                                                            alt="Man looking at item at a store"
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                        </div>
                                        <button className="arrow right" onClick={nextSlide}>
                                        <MdArrowForwardIos />

                                        </button>
                                    </div> */}

                                </div>
                            </div>
                            <div className="col-span-4 grid grid-cols-1 xl:grid-cols-2 gap-4 w-full ">
                                <div className=" w-full">
                                    <div className=" flex flex-row">
                                        {data.discount ? (
                                            <span
                                                className="text-gray-400 text-sm line-through mr-2 my-1 font-[1.125rem]">
                                                {
                                                    getPrice(data.unit_price) as unknown as ReactElement
                                                }
                                            </span>
                                        ) : <span className="text-gray-400 text-sm  mr-2 my-1 font-[1.125rem]">
                                            {getPrice(data.unit_price)}
                                        </span>}

                                        {data.discount && (
                                            <span className="my-1 text-red-700 text-lg font-semibold">
                                                {getPrice(newPrice)}
                                            </span>
                                        )}
                                    </div>
                                    {data?.quantity > 0 ? (
                                        <div
                                            className="font-medium py-2 px-2 mt-2 max-h-[26px] max-w-[68.35px] bg-emerald-100 text-green-600 rounded-full text-[.75rem] flex items-center justify-center uppercase tracking-tighter">
                                            In Stock
                                        </div>
                                    ) : (
                                        <div
                                            className="font-medium py-2 px-2 mt-2 max-h-[26px] w-[100px] bg-red-100 text-red-600 rounded-full text-[.75rem] flex items-center justify-center uppercase tracking-tighter">
                                            Out of Stock
                                        </div>
                                    )}

                                    <div className="mt-6 text-[.8125rem]">
                                        <p className=" ">{data.product_description}</p>
                                    </div>
                                    {/* <div className="fixed bottom-0 left-0 right-0 md:relative md:flex md:flex-row md:items-center md:justify-between md:max-w-[130px] md:mx-auto md:mt-10 md:mb-4 md:px-4">
                                    <div className="w-full flex items-center justify-between min-h-[44px] md:min-h-auto md:flex-1 md:grid md:grid-cols-3"> */}
                                    <div className="hidden lg:block">
                                        <div
                                            className=" w-full lg:min-h-[44px] md:relative md:flex md:flex-row md:w-auto lg:max-w-[130px] md:min-h-[44px] md:max-w-[130px] mt-10 flex flex-row">
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

                                                {/* <div className=" flex items-center justify-center w-full text-center ">
                                                    {data.count}
                                                </div> */}

                                                <button
                                                    type="button"
                                                    className="px-4 hover:bg-yellow-400 border-gray-500 bg-gray-300  text-[20px]   rounded-full  font-medium"
                                                    onClick={() => handleIncrement(data)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className=" bg-primary text-white min-h-[34px] min-w-[140px] rounded-full text-[13px]  ml-4"
                                                onClick={() => handleAddToCart(data)}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    {/* <div className="flex flex-row mt-10  ">
                                        <div className="max-h-[33px] max-w-[135px] bg-white border border-gray-600 rounded-[2.0625rem] hover:cursor-pointer">
                                            <button
                                                className="flex flex-row px-3 py-2"
                                                onClick={() => handleWishlist(data)}
                                            >
                                                <FaHeart className="h-[15px] w-[15px] text-gray-500"></FaHeart>
                                                <span className="text-[10.5px] ml-2 tracking-[-0.05em] text-gray-500 font-semibold uppercase">
                                                    ADD TO WISHLIST
                                                </span>
                                            </button>
                                        </div>
                                        <div className="ml-4 flex flex-row items-center justify-center">
                                            <button type="button" className="flex flex-row ">
                                            <TbArrowsDownUp className="h-[15px] w-[15px] text-gray-500"></TbArrowsDownUp>
                                            <span className="text-[11px] ml-2 tracking-[-0.05em] text-gray-500 font-semibold uppercase">
                                                compare
                                            </span>
                                        </button>
                                        </div>
                                    </div> */}
                                    <div className="max-h-[66px] w-full mt-6">
                                        {data.type && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2">
                                                    <BsCheckLg
                                                        className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>
                                                <div className="">
                                                    Type: <span className="">{data.type}</span>
                                                </div>

                                            </div>
                                        )}
                                        {data.mfgDate && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2 ">
                                                    <BsCheckLg
                                                        className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>

                                                <div className="">
                                                    MFG: <span>{data.mfgDate}</span>
                                                </div>

                                            </div>
                                        )}

                                        {data.life && (
                                            <div className="flex flex-row text-[.75rem] place-items-start mb-1">
                                                <div className="mr-2">
                                                    <BsCheckLg
                                                        className="h-[15px] w-[15px] text-green-600 stroke-[1px]"></BsCheckLg>
                                                </div>

                                                <div className="">
                                                    LIFE: <span className="">{data.life}</span>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                    <hr className="max-w-[330px] mt-6"></hr>
                                    <div className="mt-6 max-h-[72.8px] max-w-[308.33px]">
                                        {/*{myCategory.length > 0 && (
                                            <div className="flex flex-row">
                                                <span className="text-gray-400 text-xs capitalize">
                                                    Category:
                                                    {myCategory.map((cat: any, index) => (
                                                        <a
                                                            key={index}
                                                            href=""
                                                            rel="tag"
                                                            className="ml-2 text-gray-600 text-xs capitalize"
                                                        >
                                                            {cat.name}
                                                        </a>
                                                    ))}
                                                </span>
                                            </div>
                                        )}*/}

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

                                        <div className="flex flex-row gap-1.5 max-w-[229px] my-6">
                                            <div className="">
                                                <a
                                                    href={facebookShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={facebookShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-blue-700 flex items-center justify-center">
                                                        <FaFacebookF className="text-white"></FaFacebookF>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={twitterShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={twitterShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-cyan-500 flex items-center justify-center">
                                                        <FaTwitter className="text-white"></FaTwitter>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={pinterestShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={pinterestShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-red-600 flex items-center justify-center">
                                                        <FaPinterest className="text-white"></FaPinterest>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={linkedinShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={linkedinShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-cyan-700 flex items-center justify-center">
                                                        <FaLinkedin className="text-white"></FaLinkedin>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={redditShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={redditShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-orange-600 flex items-center justify-center">
                                                        <FaReddit className="text-white"></FaReddit>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="">
                                                <a
                                                    href={whatsappShareUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={whatsappShareClick}
                                                >
                                                    <div
                                                        className="h-[34px] w-[34px] rounded-full bg-green-500 flex items-center justify-center">
                                                        <FaWhatsapp className="text-white"></FaWhatsapp>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4 mt-10 xl:mt-0">
                                    {/* <div className="flex flex-row items-center justify-center max-h-[38px] w-full rounded  bg-red-100  text-[.8125rem] p-6 text-red-800">
                                        Covid-19 Info: We keep delivering.
                                    </div> */}
                                    <div className=" bg-gray-100  p-6 py-10 space-y-8 mt-4">
                                        <div className="flex flex-row place-items-center">
                                            <div className="mr-4">
                                                <FaShippingFast className="min-w-[30px] min-h-[20px]"></FaShippingFast>
                                            </div>
                                            <div className="text-xs">Free Shipping apply to all orders over Rs 100</div>
                                        </div>
                                        <div className="flex flex-row place-items-center ">
                                            <div className="mr-4">
                                                <GiMedicinePills
                                                    className="min-w-[30px] min-h-[20px]"></GiMedicinePills>
                                            </div>
                                            <div className="text-xs">Guranteed 100% Organic from natural farmas</div>
                                        </div>
                                        {/* <div className="flex flex-row place-items-center ">
                                            <div className="mr-4">
                                                <HiOutlineCurrencyDollar className="min-w-[30px] min-h-[20px] "></HiOutlineCurrencyDollar>
                                            </div>
                                            <div>1 Day Returns if you change your mind</div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white drop-shadow rounded-md mt-10 pb-5">
                        <div
                            className=" flex flex-col sm:flex-row gap-4 sm:gap-8  justify-start text-left text-gray-400 py-5 px-6">
                            <button
                                className={`   ${isColor === 1 ? "text-black" : "text-[#c2c2d3]"
                                }`}
                                onClick={() => handleChange(1)}
                            >
                                DESCRIPTION
                            </button>
                            {data.additionalInformation?.length > 0 && (
                                <button
                                    className={`  ${isColor === 2 ? "text-black" : "text-[#c2c2d3]"
                                    }`}
                                    onClick={() => handleChange(2)}
                                >
                                    ADDITIONAL INFORMATION
                                </button>
                            )}
                            <button
                                className={`   ${isColor === 3 ? "text-black" : "text-[#c2c2d3]"
                                }`}
                                onClick={() => handleChange(3)}
                            >
                                REVIEWS({approvedReviews.length})
                            </button>
                        </div>
                        <hr/>
                        <div className="mt-4 px-6">
                            {isColor === 1 ? (
                                <Description data={data}/>
                            ) : isColor === 2 ? (
                                <AdditionalInformation data={data}/>
                            ) : (
                                <Review itemId={itemId}/>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="container mx-auto xl:px-40 px-5">
                    <RelatedProduct findcategory={findcategory} />
                </div>
                <div className="pb-20 pt-20 container mx-auto xl:px-40 px-5">
                    <RecentlyViewProduct />
                </div> */}

                {/* mobile view */}
                <div className="lg:hidden">
                    <div className="fixed bottom-0 w-full h-20 bg-white flex items-center justify-between z-50">
                        <div className="grid grid-cols-3 gap-2 min-h-[44px] min-w-[130px] pl-4">
                            <button
                                type="button"
                                className="hover:bg-yellow-400 px-4 border-gray-500 bg-gray-300 text-[25px]  rounded-full font-medium"
                                onClick={() => handleDecrement(data)}
                            >
                                -
                            </button>

                            <div className=" flex items-center justify-center w-full text-center ">
                                {data?.count || 1}
                            </div>

                            <button
                                type="button"
                                className="px-4 hover:bg-yellow-400 border-gray-500 bg-gray-300  text-[20px]   rounded-full  font-medium"
                                onClick={() => handleIncrement(data)}
                            >
                                +
                            </button>
                        </div>
                        <div className="pr-4">
                            <button
                                type="button"
                                className=" bg-blue-900 text-white px-6 md:px-12 py-3 rounded-full text-[13px]"
                                onClick={() => handleAddToCart(data)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal or Lightbox */}
            {
                isModalOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black  flex items-center justify-center z-50">
                        <button
                            className="absolute top-2 right-8 text-white text-4xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <div className="relative">
                            {/* Close Icon */}

                            {/* Full screen image */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={data.product_image}
                                    alt="mainImage"
                                    width={700} // Adjust the width value as per your requirements
                                    height={700} // Adjust the height value as per your requirements
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ItemPages;


