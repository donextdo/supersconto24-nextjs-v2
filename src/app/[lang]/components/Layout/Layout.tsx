"use client"
import React, {ReactNode, useEffect} from "react";
import Message from "../Message/Message";
import TopHeader from "../TopHeader/TopHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer-top";
import NavBar from "../Navbar/NavBar";
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/[lang]/redux/store";
import {getExchangeRates} from "@/app/[lang]/features/site-data/siteDataSlice";

type Props = {
    children: ReactNode;
    params: {lang: string};
};

const Layout: React.FC<Props> = ({children, params:{lang}}) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getExchangeRates())

    }, [])

    const pathname = usePathname()
    return (
        <div className="">
            {/* <LocaleSwitcher /> */}
            {!pathname.includes("catalog-preview") && <>
                <Message/>
                <TopHeader lang={lang}/>
                <Header/>
                <NavBar/>
            </>}
            {children}
            {!pathname.includes("catalog-preview") && <Footer/>}
        </div>
    );
};

export default Layout;
