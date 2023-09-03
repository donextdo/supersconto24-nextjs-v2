import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/[lang]/redux/store";
import { logOut as signOut } from "@/app/[lang]/features/auth/authSlice";

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
            console.log("runs on empty state", { authUserString })

            if (authUserString) {
                const authUser = JSON.parse(atob(authUserString))
                console.log("runs on empty state", { authUser })

                if (authUser) {
                    setAuthUser(authUser)
                    setIsLoggedIn(true)
                } else {
                    setAuthUser(null)
                    setIsLoggedIn(false)
                }
            } else {
                setAuthUser(null)
                setIsLoggedIn(false)
            }
        } else {
            console.log("runs on filled state", authState.currentUser)
            setAuthUser(authState.currentUser)
            setIsLoggedIn(true)
        }
    }, [authState.currentUser])

    const logOut = () => {
        dispatch(signOut)
    }

    return { isLoggedIn, authUser, logOut }
};

export default useAuthCheckHook;