
import MainFlyerList from '@/app/[lang]/components/MainFlyer/MainFlyerList'
import NewProductList from '@/app/[lang]/components/NewProduct/NewProductList'
import ProductList from '@/app/[lang]/features/product/ProductList'
import Image from 'next/image'
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import ShopsList from './components/Shops/ShopsList';
import { ImageOne, ImageTwo } from './components/ImageAds/ImageOne';
import MoreCategoriesList from './components/MoreCategories/MoreCategoriesList';
import NewsLettertwo from './components/NewsLetter2/NewsLettertwo';
import LatestFlyers from './components/LatestFlyers/LatestFlyers';
import FeaturedFlyer from './components/FeaturedFlyer/FeaturedFlyer';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang)
    console.log("render page", dictionary)

    return (
        <div className='container mx-auto xl:px-40 px-5'>
            {/* <NewProductList /> */}
            <div className='grid grid-cols-4 gap-1'>
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

            <div className='w-full flex flex-row gap-4'>
                <div className='w-96  hidden xl:block'>

                </div>
                <div className='w-full '>
                    <MainFlyerList locale={lang} dictionary={dictionary.mainFlyer} />

                </div>

            </div>


            <div className='w-full flex flex-row gap-4'>
                <div className='w-96 hidden xl:block'>
                    <ImageOne />
                </div>
                <div className='w-full'>
                    <div className='mt-8'>
                        <ProductList />
                    </div>

                </div>

            </div>

            <div className='w-full flex flex-row gap-4'>
                <div className='w-96 hidden xl:block'>
                    <ImageTwo />
                </div>
                <div className='w-full'>
                    <div className='mt-8'>
                    <FeaturedFlyer />
                    </div>

                </div>

            </div>

            <div className='mt-8'>
                <LatestFlyers />
            </div>

            <div className='mt-8'>
                <ShopsList />
            </div>

            <div className='mt-8'>
                <MoreCategoriesList />
            </div>

            <div className='mt-8'>
                <NewsLettertwo />
            </div>
        </div>
    )
}
