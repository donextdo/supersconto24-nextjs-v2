import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {Product} from "@/app/[lang]/features/product/product";
import {addProduct, removeProduct, setCart} from "@/app/[lang]/features/cart/cartSlice";

const useAuthCheckHook = () => {

    const authState = useSelector((state: RootState) => state.auth);
    const [authUser, setAuthUser] = useState<any>()
    const [authToken, setAuthToken] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!authState.currentUser) {
            console.log("runs on empty state")
            const authUserString = localStorage.getItem("userData") ?? null
            console.log("runs on empty state",{authUserString})

            if (authUserString) {
                const authUser = JSON.parse(atob(authUserString))
                console.log("runs on empty state",{authUser})

                if (authUser) {
                    setAuthUser(authUser)
                    setIsLoggedIn(true)
                    setAuthUser(authUser)
                } else {
                    setAuthUser(null)
                    setIsLoggedIn(false)
                }
            }
        } else {
            console.log("runs on filled state", authState.currentUser)
            setAuthUser(authState.currentUser)
            setIsLoggedIn(true)
        }
    }, [authState.currentUser])

    const logOut = useCallback(() => {
        dispatch(logOut)
    }, [])

    return {isLoggedIn, authUser, logOut}
};

export default useAuthCheckHook;