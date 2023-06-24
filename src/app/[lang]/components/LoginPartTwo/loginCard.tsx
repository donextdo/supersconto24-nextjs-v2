"use client"
import React, {useEffect} from "react";
import {FaGoogle, FaFacebook} from "react-icons/fa";
import logo from '../../../../../assets/logo/logo.png'
import Image from "next/image";
import jwt_decode from "jwt-decode";
import {socialAuth} from "@/app/[lang]/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/[lang]/redux/store";
import {useRouter} from "next/navigation";

const LoginCard = () => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        (window as any).handleCredentialResponse = handleCredentialResponse;

    }, [])

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


    return (
        <div className="flex justify-center pt-8">
            <div className="w-[700px] bg-white  shadow-lg">
                <div className="flex flex-row justify-center items-center">
                    <div className="h-[50px] w-auto ">
                        {/* <Logo /> */}
                        <Image
                            src={logo}
                            alt="item1"
                            style={{
                                objectFit: "contain",
                                backgroundColor: "white",
                                width: "100%",
                                height: "100%",
                            }}
                            width={450}
                            height={400}
                        />
                    </div>
                </div>
                <h1 className="font-semibold mb-4 mt-4 text-center text-[#636466] text-[13px]">
                    Discover the Best Deals Around You: Your One-Stop Marketplace for Local Discounts and Promotions!
                </h1>
                <div className="flex mt-8">

                    <div className="w-1/2 px-6 border-r">
                        <p className="text-left mb-8 text-[#939598] text-[13px] pt-4">
                            By continuing you agree to Quora&apos;s{" "}
                            <a href="#" className="text-blue-500 underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-500 underline">
                                Privacy Policy
                            </a>
                            .
                        </p>

                        <div className="mb-4">
                            <div id="g_id_onload"
                                 data-client_id="213937378285-qqr33airluc11sth3968io0ln7pmar6u.apps.googleusercontent.com"
                                 data-context="signin"
                                 data-ux_mode="popup"
                                 data-callback="handleCredentialResponse"
                                 data-auto_prompt="false">
                            </div>

                            <div className="g_id_signin"
                                 data-type="standard"
                                 data-shape="rectangular"
                                 data-theme="outline"
                                 data-text="continue_with"
                                 data-size="large"
                                 data-logo_alignment="center"
                                 data-width="302">
                            </div>
                        </div>
                        <div className="mb-4">
                            <button
                                className="flex items-center w-[302px] border border-gray-300 text-black h-[45px] pl-[10px] rounded-md">
                                {/* <FaFacebook className="mr-2" /> */}
                                <img
                                    width="25"
                                    height="25"
                                    src="https://img.icons8.com/fluency/48/facebook-new.png"
                                    alt="facebook-new"
                                />
                                <span className="ml-3">Sign in with Facebook</span>
                            </button>
                        </div>
                        <div>
                            <p className="text-center text-[#636466] font-semibold text-[13px]">
                                Create Account with Email
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 px-6">
                        <div className="text-center">
                            <p className="font-semibold text-left text-[15px]">Sign Up</p>
                        </div>
                        <hr className=" flex items-center border-gray-300 mt-[10px] w-[302px] "/>
                        <div className="flex flex-col">
                            <label className="block text-sm font-bold text-gray-700 mb-2 mt-[10px]">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
                            />
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    <a href="#" className="text-gray-500 hover:text-gray-700 text-[13px]">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    className="bg-blue-300 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-[20px] text-[13px]">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="mt-8 h-[51px] bg-[#f1f2f2]">
                    <hr className="border-gray-300 w-full "/>

                    <p className="text-gray-500 mt-[10px] text-center text-[13px]">
                        About Us Careers Privacy Policy Contact Languages ​​Click here Supersconto24. 2023
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;