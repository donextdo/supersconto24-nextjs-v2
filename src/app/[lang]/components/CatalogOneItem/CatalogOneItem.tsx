'use client'
import Image from "next/image"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import Link from "next/link"
import { SlHandbag } from "react-icons/sl"
import nextArrow from '../../../../../public/arrow-next.svg'
import prevArrow from '../../../../../public/arrow-prev.svg'
import Draggable from "../Draggable/Draggable"
import ProductPopup from "../../features/product/ProductPopup"
import CartPopup from "@/app/[lang]/features/cart/popup-cart/CartPopup";
import logo from "../../../../../assets/logo/logo.png";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import axios from "axios"
import baseUrl from "../../../../../utils/baseUrl"

interface Props {
    catalog?: any
    params?: {
        catalogId: string;
    };
}

const CatalogCarousel: React.FC<Props> = ({ catalog, params }) => {

    const [pages, setPages] = useState([])
    const [showModal, setShowModal] = useState({ show: false, item: null })
    const [cart, setCart] = useState(false);
    const { cartCount } = useCartItemsHook()
    const [shopName, setShopName] = useState('')
    const [shopAddress, setShopAddress] = useState('')


    useEffect(() => {
        console.log(catalog);
        if (catalog) {
            setPages(catalog.pages)
        }
    }, [catalog])

    useEffect(() => {
        fetchShopData()
    }, [catalog])

    const fetchShopData = async () => {
        const response = await axios.get(`${baseUrl}/shop/find/${catalog.shop_id}`)
        console.log("shop details", response.data)
        const sName = response.data.shop_name
        const sAddress = response.data.address.address
        setShopName(sName)
        setShopAddress(sAddress)
    }

    const formattedDate = useMemo(() => {
        return new Date(catalog.expiredate).toLocaleDateString("en-GB")
    }, [catalog.expiredate])

    const handleClick = () => {
        setCart(!cart)
    };
    const handleEnter = () => {
        setCart(true);
    };
    const handleLeave = () => {
        setCart(false);
    };


    return (
        <div className="catalog-page">
            <div className="catalog-header">
                <div className='flex justify-between mx-2 items-center py-4'>
                    <div className='ml-12 '>
                        <Link href="/">
                            <Image src={logo} alt="LOGO" className='h-11 sm:h-9 md:h-11 w-auto' />
                        </Link>
                    </div>
                    <div className='text-center'>
                        {/* <p className="font-semibold">{catalog.title} - {shopName}</p>
                        <p className="text-xs">{shopAddress}</p>
                        <p className="text-xs">Expire Date - {formattedDate}</p> */}
                        <p className="">
                            <span className="text-md font-semibold">{catalog.title}</span> <span className="text-xs font-normal">| Exp. Date - {formattedDate}</span>
                        </p>
                        <p>
                        <span className="text-md font-semibold">{shopName}</span><span className="text-xs font-normal">, {shopAddress}</span>
                        </p>

                    </div>
                    <div
                        className="relative mr-2"
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <button
                            className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
                            onClick={handleClick}
                        >
                            <SlHandbag className="text-2xl text-[#ea2b0f]" />
                        </button>

                        {cart && <CartPopup />}
                        {cartCount > 0 && (
                            <div
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="catalog-component">

                <Draggable pages={pages} setShowModal={setShowModal} />

                {showModal.show && showModal.item &&
                    <ProductPopup proId={showModal.item}
                        setProductPopup={() => setShowModal(prevState => ({
                            ...prevState,
                            show: false
                        }))} />}

            </div>
        </div>
    );
}

export default CatalogCarousel;
export function NextArrowCircle({ className, style, onClick }: any) {
    return (
        <div
            className={`${className}`}
            style={style}
            onClick={onClick}
            draggable={false}
        >
            <Image fill src={nextArrow} alt={""} />
        </div>
    );
}

export function PrevArrowCircle({ className, style, onClick }: any) {
    return (
        <div
            className={`${className}`}
            style={style}
            onClick={onClick}
            draggable={false}
        >
            <Image fill src={prevArrow} alt={""} />
        </div>
    );
}