'use client'
import React from 'react';
import useAuthCheck from "@/app/[lang]/components/Hooks/useAuthCheck";
import MyAccount from "@/app/[lang]/components/MyAccount/MyAccount";
import LoginCard from "@/app/[lang]/components/LoginPartTwo/loginCard";

const Auth = () => {
    const {isLoggedIn, authUser, logOut} = useAuthCheck()
    const userData = localStorage.getItem("userData") ?? null

    console.log({isLoggedIn})
    return (
        <div>
            {(isLoggedIn && userData) ? <MyAccount /> : <LoginCard />}
        </div>
    );
};


export default Auth;