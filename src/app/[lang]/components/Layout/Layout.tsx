import React, { ReactNode } from "react";
import Message from "../Message/Message";
import TopHeader from "../TopHeader/TopHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer-top";
import LocaleSwitcher from "@/app/[lang]/components/LocaleSwitcher/LocaleSwitcher";
import NavBar from "../Navbar/NavBar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      {/* <LocaleSwitcher /> */}
      <Message />
      <TopHeader />
      <Header />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
