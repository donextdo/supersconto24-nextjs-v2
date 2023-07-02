"use client"
import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {socialAuth, UserType} from "@/app/[lang]/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

function GoogleAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        console.log('running')
        let id: NodeJS.Timer
        new Promise((resolve, reject) => {
            id = setInterval(() => {
                // console.log('a', authState)
                if (window && window.google && google?.accounts) {
                    resolve(google)
                    clearInterval(id)
                }

            }, 200);
        }).then((gc: any)  => {
            console.log("google found")

            gc.accounts.id.initialize({
                client_id: '213937378285-qqr33airluc11sth3968io0ln7pmar6u.apps.googleusercontent.com',
                callback: handleCredentialResponse
            });
            const userData = localStorage.getItem("userData")
            if (!authState?.currentUser && !authState?.currentUser && !userData) {
                gc.accounts.id.prompt();
            } else {
                gc.accounts.id.cancel();
            }

        })

        return () => clearTimeout(id);



    }, [authState]);


    function handleCredentialResponse(response: any) {
        // console.log("Encoded JWT ID token: " + response.credential);
        const userData: any = jwt_decode(response.credential)
        console.log(userData)
        dispatch(socialAuth({
            email: userData.email,
            fullName: userData.name,
            picture: {
                srcName: userData.name,
                name: userData.name,
                src: userData.picture,
            },
            role: 'CUSTOMER',
            status: 1
        }))
    }
    return null
}

export default GoogleAuth;