"use client";
import React, {useEffect, useState} from "react";
import logo from "../../../../../assets/logo/logo.png";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import {generalAuth, socialAuth} from "@/app/[lang]/features/auth/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/[lang]/redux/store";
import {useRouter} from "next/navigation";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";
import Swal from "sweetalert2";
import {IoClose} from "react-icons/io5";
import {FaFacebook} from "react-icons/fa";

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<React.ReactNode>("");
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (window as any).handleCredentialResponse = handleCredentialResponse;

    }, []);

    function handleCredentialResponse(response: any) {
        const userData: any = jwt_decode(response.credential);
        console.log(userData);
        dispatch(
            socialAuth({
                email: userData.email,
                fullName: userData.name,
                picture: {
                    srcName: userData.name,
                    name: userData.name,
                    src: userData.picture,
                },
                role: "CUSTOMER",
                status: 1,
            })
        );
    }

    const handleClick = async (event: any) => {
        event.preventDefault();
        const details = {
            email: email,
            password: password,
        };
        dispatch(generalAuth(details))
    };

    const register = () => {
        setUserNameOrEmail("");
        setRegPassword("");
        setErrorMsg("");
        setOpenRegisterModal(true);
    };

    const handleClose = () => {
        setOpenRegisterModal(false);
    };

    const handleRegClick = async (event: any) => {
        event.preventDefault();
        const details = {
            email: userNameOrEmail,
            password: regPassword,
        };
        console.log("response.data : ", details);
        try {
            const response = await axios.post(`${baseUrl}/users/register`, details);

            if (response.status == 201 || response.status == 200) {
                Swal.fire({
                    title:
                        '<span style="font-size: 18px">You have successfully register in.</span>',
                    width: 400,
                    timer: 2000,
                    // padding: '3',
                    color: "white",
                    background: "#00B853",
                    showConfirmButton: false,
                    heightAuto: true,
                    position: "bottom",
                });
                 localStorage.setItem("id", response.data._id);
                
                dispatch(generalAuth(details))

            }
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                const statusCode = error.response.status;
                switch (statusCode) {
                    case 201:
                        router.push("/account");
                        break;
                    case 400:
                        setErrorMsg("User Already Exists");
                        break;
                    case 500:
                        setErrorMsg("Error while registering a user");
                        break;
                    default:
                        setErrorMsg("Something went wrong. Please try again later.");
                }
            }
        }
    };

    return (
        <div className="flex justify-center pt-8 ">
            <div className="w-[700px] bg-white  shadow-lg border ">
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
                    Discover the Best Deals Around You: Your One-Stop Marketplace for
                    Local Discounts and Promotions!
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
                            <div
                                id="g_id_onload"
                                data-client_id="213937378285-qqr33airluc11sth3968io0ln7pmar6u.apps.googleusercontent.com"
                                data-context="signin"
                                data-ux_mode="popup"
                                data-callback="handleCredentialResponse"
                                data-auto_prompt="false"
                            ></div>

                            <div
                                className="g_id_signin"
                                data-type="standard"
                                data-shape="rectangular"
                                data-theme="outline"
                                data-text="continue_with"
                                data-size="large"
                                data-logo_alignment="center"
                                data-width="302"
                            ></div>
                        </div>
                        <div className="mb-4">
                            <button
                                className="flex items-center w-[302px] border border-gray-300 text-black h-[45px] pl-[10px] rounded-md"
                                onClick={() => {
                                    /* global FB*/
                                    let FB = (window as any).FB;
                                    FB.getLoginStatus((res:any) => {
                                        if (res.status === "connected")
                                            FB.logout()

                                        FB.login(function (response:any) {
                                            console.log(response)
                                            if (response.authResponse) {
                                                console.log('Welcome!  Fetching your information.... ');
                                                FB.api(
                                                    '/me',
                                                    'GET',
                                                    {"fields": "id,name,email,birthday,location,picture"},
                                                    function (response:any) {
                                                        if (response.error) {
                                                            // addToast('Error occured! try again', {
                                                            //     appearance: 'error',
                                                            //     autoDismiss: true
                                                            // });
                                                        } else {
                                                            const userData = {
                                                                name: response.name,
                                                                email: response.email,
                                                                picture: response.picture.data.url,
                                                            }
                                                            console.log(userData)
                                                            handleCredentialResponse(userData)
                                                        }
                                                    }
                                                );
                                            } else {
                                                console.log('User cancelled login or did not fully authorize.');
                                            }
                                        }, {scope: 'email, public_profile'});
                                    })

                                }}
                            >
                                 {/*<FaFacebook className="mr-2" />*/}
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
                            <p
                                className="text-center text-[#636466] font-semibold text-[13px] cursor-pointer"
                                onClick={register}
                            >
                                Create Account with Email
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 px-6">
                        <div className="text-center">
                            <p className="font-semibold text-left text-[15px]">Sign In</p>
                        </div>
                        <hr className=" flex items-center border-gray-300 mt-[10px] w-[302px] "/>
                        <div className="flex flex-col">
                            <label className="block text-sm font-bold text-gray-700 mb-2 mt-[10px]">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    <a
                                        href="/lost-password"
                                        className="text-gray-500 hover:text-gray-700 text-[13px]"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-[20px] text-[13px]"
                                    onClick={handleClick}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="mt-8 h-[51px] bg-[#f1f2f2]">
                    <hr className="border-gray-300 w-full "/>

                    <p className="text-gray-500 mt-[10px] text-center text-[13px]">
                        About Us Careers Privacy Policy Contact Languages ​​Click here
                        Supersconto24. 2023
                    </p>
                </div>
            </div>
            {openRegisterModal && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900 bg-opacity-50">
                    <div className=" flex gap-6 flex-col relative  rounded-md w-full lg:w-[550px] h-[420px] bg-white">
                        <div className="flex justify-end px-2">
                            <button
                                onClick={handleClose}
                                className=" w-8 h-8 flex justify-center items-center"
                            >
                                <IoClose className="text-black mt-3"/>
                            </button>
                        </div>
                        <div className="lg:w-[500px] mx-auto border-t-0   ">
                            <form
                                // onSubmit={handleSubmit}
                                className="max-w-md mx-auto mt-5 mb-12"
                            >
                                <div className="w-1/2 ">
                                    <div className="text-center">
                                        <p className="font-semibold text-left text-[15px]">
                                            Sign In
                                        </p>
                                    </div>
                                    <hr className=" flex items-center border-gray-300 mt-[10px] w-[450px] "/>
                                    <div className="flex flex-col lg:w-[450px]">
                                        <label className="block text-sm font-bold text-gray-700 mb-2 mt-[10px]">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2 "
                                            value={userNameOrEmail}
                                            onChange={(e) => setUserNameOrEmail(e.target.value)}
                                        />
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                        />
                                        {errorMsg && (
                                            <div className="border border-gray-300 p-3 mx-2 flex items-center">
                        <span className="font-bold text-black mr-2">
                          Error:
                        </span>
                                                <div className="text-black text-sm">{errorMsg}</div>
                                            </div>
                                        )}
                                        <hr className=" flex items-center border-gray-300 mt-4 w-[450px] "/>
                                        <div className="flex items-center justify-end mt-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-[20px] text-[13px]"
                                                onClick={handleRegClick}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginCard;
