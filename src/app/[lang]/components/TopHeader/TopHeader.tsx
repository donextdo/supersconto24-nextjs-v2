'use client'
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import {useCallback, useEffect, useState} from "react";
import Currency from "../Currency/Currency";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/[lang]/redux/store";
import {getExchangeRates} from "@/app/[lang]/features/site-data/siteDataSlice";
import {castDraft} from "immer";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {updateParamValue} from "../../../../../utils/baseUrl";

const TopHeader = ({lang}: { lang: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCurrency, setIsOpenCurrency] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("EUR")
    const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;
    const message = process.env.NEXT_PUBLIC_MESSAGE;
    const dispatch = useDispatch<AppDispatch>()
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const router = useRouter();


    useEffect(() => {
        console.log(searchParams.toString())
        const currency = searchParams.get("currency")
        if (currency==="USD" || currency==="EUR") {
            setSelectedCurrency(currency)
        }
    }, [])

    /*const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )*/

    useEffect(() => {
        dispatch(getExchangeRates())

        const data = [
            { key: 'currency', value: selectedCurrency }
        ];
        router.push(updateParamValue(data))

    }, [selectedCurrency])


    const handleLanguageSelect = (language: any) => {
        setIsOpen(false);
    };

    function handleAccount() {
        window.location.href = '/account'
    }

    function getLanguageFromCode() {
        switch (lang) {
            case 'it':
                return "Italian";
            case 'en':
                return "English"
            default:
                return "English"
        }
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
                                {getLanguageFromCode()}
                            </button>

                            {isOpen && <LocaleSwitcher handleLanguageSelect={handleLanguageSelect}/>}

                        </div>
                        <div
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setIsOpenCurrency(true)}
                            onMouseLeave={() => setIsOpenCurrency(false)}
                        >
                            <button className=" text-xs">{selectedCurrency}</button>

                            {isOpenCurrency && <Currency setSelectedCurrency={setSelectedCurrency}/>}

                        </div>
                    </div>
                </div>

            </div>
            <hr/>
        </>
    );
}

export default TopHeader;