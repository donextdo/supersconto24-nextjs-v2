'use client'
import LoginRegisterPage from "@/app/[lang]/components/LoginRegister/LoginRegister";
import MyAccount from "@/app/[lang]/components/MyAccount/MyAccount";
import { useEffect, useState } from "react";
import LoginCard from "../components/LoginPartTwo/loginCard";

const AccountPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    return ( 
        <div>
        {/* {isLoggedIn ? <MyAccount /> : <LoginRegisterPage />} */}
        {isLoggedIn ? <MyAccount /> : <LoginCard />}
        {/* // <MyAccount /> */}
    </div>
     );
}
 
export default AccountPage;