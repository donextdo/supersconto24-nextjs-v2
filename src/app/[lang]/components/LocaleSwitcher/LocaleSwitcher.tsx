'use client'

import { usePathname } from 'next/navigation'
import {i18n} from "../../../../../i18n-config";
import {useRouter} from "next/navigation";

export default function LocaleSwitcher() {
    const pathName = usePathname()
    const router = useRouter()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }
    const setCookie = (c_name: string, c_value: string, exDays: number) => {
        const date = new Date();
        date.setDate(date.getDate() + exDays);
        document.cookie = encodeURIComponent(c_name)
            + "=" + encodeURIComponent(c_value)
            + (!exDays ? "" : "; expires=" + date.toUTCString()) + "path=/;";
    }


    return (
        <div>
            <p>Locale switcher:</p>
            <ul>
                {i18n.locales.map((locale) => {
                    return (
                        <li key={locale}>
                            <a onClick={() => {
                                setCookie('lang', locale, 365)
                                router.push(redirectedPathName(locale));
                            }}>{locale}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
