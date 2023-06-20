

import MainFlyerList from '@/app/[lang]/components/MainFlyer/MainFlyerList'
import NewProductList from '@/app/[lang]/components/NewProduct/NewProductList'
import ProductList from '@/app/[lang]/features/product/ProductList'
import Image from 'next/image'
import {Locale} from "../../../i18n-config";
import {getDictionary} from "../../../get-dictionary";

export default async function Home({params: {lang}}: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang)
    console.log("render page", dictionary)

    return (
        <div className='container mx-auto xl:px-40 px-5'>
            {/* <NewProductList /> */}
            {/* <ProductList /> */}
            <div className='grid grid-cols-3 gap-1'>
                {/* left side */}
                <div className='col-span-1'> {dictionary['server-component'].welcome}</div>

                {/* right side */}
                <div className='col-span-2 '>
                    <MainFlyerList locale={lang} dictionary={dictionary.mainFlyer}/>
                    {/*<ProductList/>*/}
                </div>

            </div>

        </div>
    )
}
