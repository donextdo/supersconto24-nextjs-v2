"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/app/[lang]/components/Layout/Layout'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {i18n} from "../../../i18n-config";
import React from "react";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
    <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng&libraries=places`}
        onLoad={() => console.log("Google Maps API script loaded")}
    />
      <body className={inter.className}>
        <Provider store={store}>
          <Layout>
            {children}
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
