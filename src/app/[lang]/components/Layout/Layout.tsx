import React, {ReactNode} from "react";
import Message from "../Message/Message";
import TopHeader from "../TopHeader/TopHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer-top";
import NavBar from "../Navbar/NavBar";
import {usePathname} from "next/navigation";

type Props = {
    children: ReactNode;
    params: {lang: string};
};

const Layout: React.FC<Props> = ({children, params:{lang}}) => {

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
