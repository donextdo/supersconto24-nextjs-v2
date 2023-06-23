import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import logo from '../../../../../assets/logo/logo.png'
import Image from "next/image";

const LoginCard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[700px] bg-white  shadow-lg">
        <div className="flex flex-row justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            className="w-[175.65px] h-[100px] flex flex-row "
          />
        </div>
        <h1 className="font-semibold mb-4 mt-2 text-center">
          A great place to share knowledge and know the world better
        </h1>
        <div className="flex mt-8">

          <div className="w-1/2 px-6 border-r">  
            <p className="text-left mb-8">
              By continuing you agree to Quora's{" "}
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
              <button className="flex items-center w-[302px] border border-gray-300 text-black   font-semibold h-[45px] pl-[10px]  rounded-md">
                {/* <FaGoogle className="mr-2" /> */}
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/fluency/48/google-logo.png"
                  alt="google-logo"
                />
                <span className="ml-3">Sign in with Google</span>
              </button>
            </div>
            <div className="mb-4">
              <button className="flex items-center w-[302px] border border-gray-300 text-black   font-semibold h-[45px] pl-[10px] rounded-md">
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
              <p className="text-center text-gray-500 text-[13px] text-center">
                Create Account with Email
              </p>
            </div>
          </div>
          <div className="w-1/2 px-6">
            <div className="text-center">
              <p className="text-[14px] font-semibold text-left ">Sign Up</p>
            </div>
            <hr className=" flex items-center border-gray-300 mt-[10px] w-[302px] " />
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-[10px]">
                Email
              </label>
              <input
                type="email"
                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full  h-[45px] border border-gray-300 rounded-md mb-4 px-2"
              />
              <div className="flex items-center justify-between">
                <div>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    Forgot password?
                  </a>
                </div>
                <button className="bg-blue-300 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-[20px]">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="mt-8 h-[51px]">
          <hr className="border-gray-300 w-full ml-1" />

          <p className="text-gray-500 mt-[10px] text-center">
            About Us Careers Privacy Policy Contact Languages ​​Click hereQuora
            Inc. 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;