'use client'
import LoginRegisterPage from "@/app/[lang]/components/LoginRegister/LoginRegister";
import MyAccount from "@/app/[lang]/components/MyAccount/MyAccount";
import { useEffect, useState } from "react";
import LoginCard from "../components/LoginPartTwo/loginCard";
import {useSelector} from "react-redux";
import {RootState} from "@/app/[lang]/redux/store";
import {useRouter} from "next/navigation";

const AccountPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authState = useSelector((state: RootState) => state.auth)
    const router = useRouter()
    const userData = localStorage.getItem("userData") ? JSON.parse(atob(localStorage.getItem("userData")!)) : null


    useEffect(() => {
        console.log(authState.currentUser , userData, authState.currentUser || userData)
        if (authState.currentUser || userData) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [authState])

    useEffect(()=>{
        // window.location.reload();
    },[])

    return ( 
        <div>
        {/* {isLoggedIn ? <MyAccount /> : <LoginRegisterPage />} */}
        {isLoggedIn ? <MyAccount /> : <LoginCard />}
        {/* // <MyAccount /> */}
    </div>
     );
}
 
export default AccountPage;