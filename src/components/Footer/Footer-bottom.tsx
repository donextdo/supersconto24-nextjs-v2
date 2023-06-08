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
import googleplay from '../../../assets/playstore/google-play.png'
import applestore from '../../../assets/playstore/google-play.png'


import Image from "next/image";
import Link from "next/link";

export default function BottomFooter() {
  const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;
  return (
    <>
      <div className="my-10 ">
        <div className="flex justify-between px-2">
          <div className="flex">
            <div>
              <button className="p-5 border rounded-full md:ml-40 lg:ml-0">
                <FiPhoneCall />
              </button>
            </div>

            <div className="px-2 xl:px-5 lg:mr-0 xl:mr-32 2xl:mr-40">

              <h2 className="font-semibold text-[20px] flex">{contactNumber}</h2>
              <p className="text-gray-400 text-[11px]">Working 8:00 - 22:00</p>
            </div>
          </div>


                {/* <div className="ml-7 xl:ml-40 2xl:ml-96  sm:mx-10 xl:mx-0 lg:ml-16 md:ml-40">

                  <p className="font-semibold text-[14px] xl:ml-7 md:ml-7 ">
                    Download App on Mobile :
                  </p>
                  <p className="text-gray-400 text-[12px]">
                    15% discount on your first purchase
                  </p>
                </div> */}

                <div className="mt-3 lg:mt-0 xl:mt-0 md:mx-32 lg:mx-0 ">
                  <button>
                    <Image
                      src={googleplay}
                      alt="GooglePlay - Image"
                      className="ml-5 lg:ml-0 xl:ml-5"
                      width={116}
                      height={38}
                    />
                  </button>
                  <button>
                    <Image
                      src={applestore}
                      alt="AppStore - Image"
                      className="ml-2 xl:ml-2"
                      width={116}
                      height={38}
                    />
                  </button>
                </div>

          <div className="sm:mx-[25%]  lg:mx-0 xl:mx-0 my-0">
            <Link href="https://www.facebook.com/buntalksl"><button className="border rounded-full p-2  mt-3 lg:mt-0 text-[#233a95]">
              <GrFacebookOption />
            </button></Link>
            <button className="border rounded-full p-2  mx-2 text-[#233a95]">
              <AiOutlineTwitter />
            </button>
            <button className="border rounded-full p-2    text-[#233a95]">
              <AiOutlineInstagram />
            </button>
          </div>
        </div>

        <hr className="my-5 " />

        <div className="xl:flex justify-between">
          <div className="lg:flex lg:mb-5 xl:mb-0">
            <div>

              <p className="text-gray-400 text-[12px] pl-5 xl:mr-7">

                Copyright © 2023 Buntalk. All Rights Reserved.
              </p>
            </div>


            <div className="flex mt-5 lg:mt-0 lg:pl-32 xl:pl-5 2xl:ml-60">

              <p className="text-gray-400 text-[12px]  pl-5 lg:pl-2">
                <Link
                  href="/privacy-policy"
                  className="hover:underline hover:underline-offset-1"
                >
                  Privacy Policy
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]  pl-4 lg:pl-2">
                <Link
                  href="/terms"
                  className="hover:underline hover:underline-offset-1"
                >
                  Terms and Conditions
                </Link>
              </p>
              <p className="text-gray-400 text-[12px]  pl-4 lg:pl-2">
                <Link
                  href="/#"
                  className="hover:underline hover:underline-offset-1"
                >
                  Cookie
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden lg:block  ">
            <div></div>
            <button className="ml-5 xl:ml-7">
              <SiAmericanexpress className="text-2xl text-gray-600" />
            </button>
            {/* <button className="ml-5 xl:ml-7">
              <FaCcStripe className="text-2xl text-gray-600" />
            </button>
            <button className="ml-5 xl:ml-7">
              <FaGooglePay className="text-2xl text-gray-600" />
            </button>
            <button className="ml-5 xl:ml-7">
              <SiApplepay className="text-2xl text-gray-600" />
            </button>
            <button className="ml-5 xl:ml-7">
              <FaCcPaypal className="text-2xl text-gray-600" />
            </button> */}
            <button className="ml-5 xl:ml-7">
              <RiMastercardFill className="text-2xl text-gray-600" />
            </button>
            <button className="ml-5 xl:ml-7">
              <SiVisa className="text-2xl text-gray-600" />
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
