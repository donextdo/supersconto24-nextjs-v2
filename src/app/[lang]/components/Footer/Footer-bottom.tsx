//import icons
import { FiPhoneCall } from "react-icons/fi";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { SiApplepay } from "react-icons/si";
import { RiMastercardFill } from "react-icons/ri";
import { SiVisa } from "react-icons/si";
import googleplay from '../../../../../assets/playstore/google-play.png'
import applestore from '../../../../../assets/playstore/app-store.png'


import Image from "next/image";
import Link from "next/link";

export default function BottomFooter() {
  const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;
  return (
    <>
      <div className="py-10 ">
        <div className="flex flex-col md:flex-row gap-4 justify-center sm:justify-between px-2 items-center">
          <div className="space-y-2">
            <div className="flex">
              <div>
                <button className="p-3 border rounded-full mr-2">
                  <FiPhoneCall />
                </button>
              </div>

              <div className="">

                <h2 className="font-semibold text-[20px] flex">{contactNumber}</h2>
                <p className="text-gray-400 text-[11px]">Working 8:00 - 22:00</p>
              </div>
            </div>
            
          </div>


          <div className="flex flex-col  gap-2 items-center justify-end">
            {/* <div className="ml-7 xl:ml-40 2xl:ml-96  sm:mx-10 xl:mx-0 lg:ml-16 md:ml-40">

              <p className="font-semibold text-[14px] xl:ml-7 md:ml-7 ">
                Download App on Mobile :
              </p>
              <p className="text-gray-400 text-[12px]">
                15% discount on your first purchase
              </p>
            </div> */}

            <div className="mt-3 flex flex-col sm:flex-row gap-2 ">
              <button>
                <Image
                  src={googleplay}
                  alt="GooglePlay - Image"
                  className=""
                  width={116}
                  height={38}
                />
              </button>
              <button>
                <Image
                  src={applestore}
                  alt="AppStore - Image"
                  className=""
                  width={116}
                  height={38}
                />
              </button>
            </div>

            <div className="">
              <Link href="https://www.facebook.com"><button className="border rounded-full p-2  mt-3 lg:mt-0 text-[#233a95]">
                <GrFacebookOption />
              </button></Link>
              <Link href="https://www.twitter.com">
                <button className="border rounded-full p-2  mx-2 text-[#233a95]">
                  <AiOutlineTwitter />
                </button>
              </Link>
              <Link href="https://www.instagram.com">
                <button className="border rounded-full p-2    text-[#233a95]">
                  <AiOutlineInstagram />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-row gap-2">

              <p className="text-gray-400 text-[12px]  ">
                <Link
                  href="#"
                  className="hover:underline hover:underline-offset-1"
                >
                  Careers
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]">
                <Link
                  href="/about"
                  className="hover:underline hover:underline-offset-1"
                >
                  About Us
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]">
                <Link
                  href="/contact"
                  className="hover:underline hover:underline-offset-1"
                >
                  Contact Us
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]">
                <Link
                  href="/blog"
                  className="hover:underline hover:underline-offset-1"
                >
                  Blog
                </Link>
              </p>
            </div>
        </div>

        <hr className="my-5 " />

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div>

              <p className="text-gray-400 text-[12px]">

                Copyright © 2023 SUPERSCONTO24. All Rights Reserved.
              </p>
            </div>


            <div className="flex flex-row gap-2">

              <p className="text-gray-400 text-[12px]  ">
                <Link
                  href="/privacy-policy"
                  className="hover:underline hover:underline-offset-1"
                >
                  Privacy Policy
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]">
                <Link
                  href="/terms"
                  className="hover:underline hover:underline-offset-1"
                >
                  Terms and Conditions
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]">
                <Link
                  href="/cookie"
                  className="hover:underline hover:underline-offset-1"
                >
                  Cookie
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 ">

            <button className="border py-0.5 px-2">
              <SiAmericanexpress className="text-xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <FaCcStripe className="text-2xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <FaGooglePay className="text-2xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <SiApplepay className="text-2xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <FaCcPaypal className="text-2xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <RiMastercardFill className="text-2xl text-gray-600" />
            </button>
            <button className="border py-0.5 px-2">
              <SiVisa className="text-2xl text-gray-600" />
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
