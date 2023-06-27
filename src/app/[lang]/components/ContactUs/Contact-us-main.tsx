'use client'
import ContactForm from "./Contact-us-form";
//import icons
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";

function ContactUs() {
  return (
    <>
      {/* Section -01 */}
      <div className="mt-5 text-center">
        <p className="text-gray-900 text-[40px]">Get In Touch</p>
        <p className="justify-center px-5 mx-auto mt-3 text-gray-600 text-[14px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
          quaerat unde quam dolor culpa veritatis inventore, aut commodi eum
          veniam vel.
        </p>
      </div>

      {/* Section -02 */}
      <div className=" md:flex container mx-auto xl:px-40 px-5 relative">
        <div className="mt-10  bg-[#f3f4f7] container md:mx-2.5">
          <div className="py-10 text-center sm:py-10 md:py-10">
            <p className="text-3xl sm:text-4xl   sm:px-[50%] px-[48%]  md:px-24 lg:px-[45%] text-primary">
              <IoLocationSharp />
            </p>
            <p className="mt-5 text-gray-900 md:px-10 sm:font-medium text-[15px]">
              102 Street 2714 Donovan
            </p>
            <p className="mt-3 text-gray-600  text-[13px] md:px-10">
              Lorem ipsum dolar site amet discont
            </p>
          </div>
        </div>
        <div className=" mt-10 border bg-[#f3f4f7] container md:mx-2.5 ">
          <div className="py-10 text-center sm:py-10 md:py-10">
            <p className="text-3xl sm:text-4xl  sm:px-[50%] px-[48%]  md:px-24 lg:px-[45%] text-primary">
              <FiPhoneCall />
            </p>

            <p className="mt-5 text-gray-900 text-[15px] sm:font-medium md:px-2 ">
              +02 1234 567 88
            </p>
            <p className="mt-3 text-gray-600 text-[13px] md:px-5">
              Lorem ipsum dolar site amet discont
            </p>
          </div>
        </div>
        <div className="mt-10 border bg-[#f3f4f7] container md:mx-2.5 ">
          <div className="py-10 text-center sm:py-10 md:py-10">
            <p className="text-3xl sm:text-4xl  sm:px-[50%] px-[48%]  md:px-24 lg:px-[45%] text-primary">
              <FiMail />
            </p>
            <p className="mt-5 text-gray-900 text-[15px] sm:font-medium ">
              info@example.com
            </p>
            <p className="mt-3 text-gray-600 text-[13px] md:px-5">
              Lorem ipsum dolar site amet discont
            </p>
          </div>
        </div>
      </div>
      <ContactForm
        onSubmit={function (values: {
          name: string;
          email: string;
          subject: string;
          message: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}

export default ContactUs;
