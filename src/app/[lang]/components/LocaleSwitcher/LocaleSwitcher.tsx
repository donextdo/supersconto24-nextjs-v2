'use client'

import { usePathname } from 'next/navigation'
import { i18n } from "../../../../../i18n-config";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import {setCookie} from "../../../../../utils/baseUrl";

export default function LocaleSwitcher({handleLanguageSelect}:any) {
    const pathName = usePathname()
    const router = useRouter()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }


    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedLanguage, setSelectedLanguage] = useState('');
  
    
  
    // const handleLanguageSelect = (language:any) => {
    //   setSelectedLanguage(language);
    //   setIsOpen(false);
    //   // You can perform additional actions based on the selected language
    // };
    return (

        <div className='absolute w-[100px] max-h-[540px] bg-white left-0 z-50 top-4 px-5 py-4 shadow-lg  rounded-b-lg'>
            {/* <p className="text-lg font-bold">Locale switcher:</p> */}

            <ul className=" space-y-2">
                {i18n.locales.map((locale) => {
                    return (
                        <li key={locale} className="" onClick={() => handleLanguageSelect(locale)}>
                            <a onClick={() => {
                                setCookie('lang', locale, 365)
                                router.push(redirectedPathName(locale));
                            }} className='text-black hover:text-primary text-xs'><button>{locale}</button></a>
                        </li>
                    )
                })}
            </ul>
        </div>


    //     <div
    //     className="language-select"
    //     onMouseEnter={() => setIsOpen(true)}
    //     onMouseLeave={() => setIsOpen(false)}
    //   >
    //     <button className="language-select__toggle">
    //       {selectedLanguage ? selectedLanguage : 'Select Language'}
    //     </button>
    //     {isOpen && (
    //       <ul className="">
    //       {i18n.locales.map((locale) => {
    //           return (
    //               <li key={locale} className="" onClick={() => handleLanguageSelect(locale)}>
    //                   <a onClick={() => {
    //                       setCookie('lang', locale, 365)
    //                       router.push(redirectedPathName(locale));
    //                   }} className='text-primary'>{locale}</a>
    //               </li>
    //           )
    //       })}
    //   </ul>
    //     )}
    //   </div>
    )
}
