import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

import {i18n} from '../i18n-config'

import {match as matchLocale} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({headers: negotiatorHeaders}).languages()
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales

    const cookie: any = request.cookies.get('lang')

    if (matchLocale(cookie?.value, locales, i18n.defaultLocale) === cookie?.value) {
        return cookie?.value
    }
    return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    console.log("pathname =>", pathname)
    console.log("request.url =>", request.url)
    console.log("cookie-lang =>", request.cookies.get('lang'))
    console.log("cookie-currency =>", request.cookies.get('currency'))

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    if (
        [
            '/manifest.json',
            '/favicon.ico',
            // Your other files in `public`
        ].includes(pathname)
    )
        return

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Check if there is any supported currency in the pathname
    const currencyIsMissingLocale = ["EUR", "USD"].every(
        (currency) => !pathname.includes(`currency=${currency}/`)
    )


    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        console.log(request.url)
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        const url = new URL(request.url);
        url.pathname = `/${locale}/${pathname}`;

        if (currencyIsMissingLocale) {
            const cookie: any = request.cookies.get('currency')
            if (cookie?.value && ["EUR", "USD"].includes(cookie?.value)) {
                url.searchParams.set('currency', cookie?.value);
                console.log("currency updated")
            }
        }

        console.log("redirect.url =>", url.toString())
        return NextResponse.redirect(url)

    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
