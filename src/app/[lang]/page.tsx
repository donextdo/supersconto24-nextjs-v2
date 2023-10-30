import MainFlyerList from "@/app/[lang]/components/MainFlyer/MainFlyerList";
import ProductList from "@/app/[lang]/features/product/ProductList";
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import ShopsList from "./components/Shops/ShopsList";
import {
    ImageFive,
    ImageFour,
    ImageOne,
    ImageThree,
} from "./components/ImageAds/ImageOne";
import MoreCategoriesList from "./components/MoreCategories/MoreCategoriesList";
import NewsLettertwo from "./components/NewsLetter2/NewsLettertwo";
import LatestFlyers from "./components/LatestFlyers/LatestFlyers";
import FeaturedFlyer from "./components/FeaturedFlyer/FeaturedFlyer";
import ContactAds from "./components/ImageAds/ContactAds";
import FirstPurchaceAds from "./components/ImageAds/FirstPurchaceAds";
import { Metadata } from "next";
import CitiesList from "./components/Cities/CitiesList";
import NewsList from "./News/NewsList";

export const metadata: Metadata = {
    title: "Supersconto | Home",
};
export default async function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    console.log("render page", dictionary);

    return (
        <div className="px-5 md:px-[82px] ">
            {/* <NewProductList /> */}
            <div className="grid grid-cols-4 gap-1">
                {/* left side */}
                {/* <div className='col-span-1'>
                    {dictionary['server-component'].welcome}
                    <ImageOne />
                </div> */}

                {/* right side */}
                {/* <div className='col-span-3 '>
                    <MainFlyerList locale={lang} dictionary={dictionary.mainFlyer} />
                    <div className='mt-8'>
                        <ProductList />
                    </div>

                </div> */}
            </div>

            <div className="w-full mt-4">
                <div className="flex flex-col">
                    <div className="uppercase font-semibold text-lg font-ff-headings lg:text-xl">
                        YOUR NEAREST FLYERS
                    </div>
                    <div className="text-xs text-gray-400">
                        Do not miss the current offers until the end of March.
                    </div>
                </div>

                <div className="w-full mt-2">
                    <MainFlyerList locale={lang} dictionary={dictionary.mainFlyer} />
                </div>
            </div>

            {/* <div className="w-full ">


                <div className="mt-10">
                    <ProductList />
                </div>

            </div> */}

            <div className="w-full flex flex-row gap-4 mt-10">
                <div className="w-96 hidden xl:block">
                    <ImageOne />
                </div>
                <div className="w-full">
                    <div className="">
                        <FeaturedFlyer />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <LatestFlyers />
            </div>

            <div className="mt-10">
                <ShopsList />
            </div>

            <div className="mt-10">
                <CitiesList />
            </div>

            <div className="mt-10">
                <NewsList />
            </div>

            <div className="mt-10">
                <FirstPurchaceAds />
            </div>

            <div className="mt-10 w-full flex flex-row gap-4">
                <div className="w-96  hidden lg:block">
                    <ImageFive />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full ">
                    <ImageThree />
                    <ImageFour />
                </div>
            </div>

            <div className="mt-10">
                <MoreCategoriesList />
            </div>

            {/* <div className="mt-8">
                <NewsLettertwo />
            </div> */}

            {/* <div className="footer-container">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 py-16 px-8">
                    <div className="link-set">
                        <p>Customer Care</p>
                        <ul>
                            <li>
                                <a href="#">Customer Care</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="link-set">
                        <p>Customer Care</p>
                        <ul>
                            <li>
                                <a href="#">Customer Care</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="link-set">
                        <p>Customer Care</p>
                        <ul>
                            <li>
                                <a href="#">Customer Care</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="link-set">
                        <p>Customer Care</p>
                        <ul>
                            <li>
                                <a href="#">Customer Care</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="link-set">
                        <p>Customer Care</p>
                        <ul>
                            <li>
                                <a href="#">Customer Care</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Help Section</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
