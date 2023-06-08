"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout/Layout'
import { store } from "../redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
