'use client'
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import baseUrl from "../../../../../utils/baseUrl";
import coupon from '../../../../../assets/coupon/coupon.png'

const NewsLettertwo = () => {
  const [email, setEmail] = useState('');
  

  const handlesubscribe = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/subscribe/insert`, { email });
  
      if (response.status === 200) {
        // Handle successful subscription
        setEmail('');
        alert('Subscription successful');
      } else {
        // Handle subscription error
        const { message } = response.data;
        alert(`Subscription failed: ${message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Subscription successful');
      // Handle fetch error
    }


  }

  return (
    <div className=" bg-[#233a95] w-full">
      <div className="px-5 sm:px-5 lg:px-10 2xl:px-40">
        <div className="grid lg:grid-cols-2">
          <div className="lg:self-center">
            {/* <p className="mt-6 text-base text-gray-300 lg:mt-10">
              Rs 20 discount for your first order
            </p> */}
            <h2 className="text-lg font-bold text-white lg:text-3xl lg:mt-2">
              Join our newsletter and get...
            </h2>
            <p className="mt-2 text-sm text-gray-300 opacity-60 lg:text-base lg:mt-6">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>
            <form className=" mt-4" onSubmit={handlesubscribe}>
              {/* <label htmlFor="email-address" className="sr-only">
                Email address
              </label> */}
              <div className="relative bg-white rounded-md flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="pl-8 text-gray-900 bg-white h-[48px] lg:h-[62px] placeholder:text-sm "
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-2 mt-2 text-xl text-gray-400 ">
                  <CiMail />
                </span>
                <button
                  type="submit"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-[#233a95] py-2 px-4 text-white rounded-md lg:py-[15px]"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center mt-6 lg:mt-10">
            <Image
              src={coupon}
              alt="Newsletter - Image"
              className="w-80 lg:w-3/4"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLettertwo;