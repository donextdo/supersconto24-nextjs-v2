import React, { ReactNode } from "react";
import Message from "../Message/Message";
import TopHeader from "../TopHeader/TopHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer-top";


type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      <Message />
      <TopHeader />
      <Header />
      {children}
     <Footer />
    </div>
  );
};

export default Layout;
