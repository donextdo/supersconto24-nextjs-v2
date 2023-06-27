'use client'
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import {useEffect, useState} from "react";
import Currency from "../Currency/Currency";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/[lang]/redux/store";
import {getExchangeRates} from "@/app/[lang]/features/site-data/siteDataSlice";
import {Locale} from "../../../../../i18n-config";

const TopHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCurrency, setIsOpenCurrency] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;
    const message = process.env.NEXT_PUBLIC_MESSAGE;
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getExchangeRates())
    }, [])

    const handleLanguageSelect = (language: any) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };

    function handleAccount () {
        window.location.href = '/account'
    }

    return (
        <>
            <div className=" hidden xl:block container mx-auto xl:px-40 px-5">
                <div className=" flex justify-between py-2.5">
                    <div>
                        <nav>
                            <ul className="flex gap-4 text-xs">
                                <li>
                                    <Link href="/about">
                                        <p>About Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleAccount} href={""}>
                                        <p>My account</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/wishlist">
                                        {/* <p>Wishlist</p> */}
                                    </Link>
                                </li>
                                <li>
                                    {/* <Link href="#">
                                    <p>Order Tracking</p>
                                </Link> */}
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs mr-4">
                            {message}
                        </span>
                        <span className="text-xs text-gray-300 mr-4">
                            |
                        </span>
                        <span className="text-xs flex mr-4">
                            Need help? Call Us: <p className="text-[#00B853] font-semibold ml-2">{contactNumber}</p>
                        </span>
                        <div
                            className="relative mr-4 flex flex-col items-center"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <button className=" text-xs">
                                {selectedLanguage}
                            </button>

                            {isOpen && <LocaleSwitcher handleLanguageSelect={handleLanguageSelect}/>}

                        </div>
                        <div
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setIsOpenCurrency(true)}
                            onMouseLeave={() => setIsOpenCurrency(false)}
                        >
                            <button className=" text-xs">EUR</button>

                            {isOpenCurrency && <Currency />}

                        </div>
                    </div>
                </div>

            </div>
            <hr />
        </>
    );
}

export default TopHeader;