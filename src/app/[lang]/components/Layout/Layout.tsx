import React, {ReactNode} from "react";
import Message from "../Message/Message";
import TopHeader from "../TopHeader/TopHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer-top";
import LocaleSwitcher from "@/app/[lang]/components/LocaleSwitcher/LocaleSwitcher";
import NavBar from "../Navbar/NavBar";
import {usePathname} from "next/navigation";

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = ({children}) => {

    const pathname = usePathname()
    return (
        <div className="">
            {/* <LocaleSwitcher /> */}
            {!pathname.includes("catalog-preview") && <>
                <Message/>
                <TopHeader/>
                <Header/>
                <NavBar/>
            </>}
            {children}
            {!pathname.includes("catalog-preview") && <Footer/>}
        </div>
    );
};

export default Layout;
