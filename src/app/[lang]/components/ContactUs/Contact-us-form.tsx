'use client'

import React, { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

const ContactForm: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, subject, message });
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
  return (
    <>
      <div className="relative mx-5 lg:border lg:shadow-lg lg:m-16 md:mx-5 lg:mx-2 xl:mx-10 2xl:mx-60">
        <div className="max-w-3xl mx-5 mt-16 text-center md:mx-auto">
          <h2 className="text-[40px] text-gray-900 sm:text-4xl lg:text-[40px]">
            Send Us
          </h2>
          <p className="text-[14px] mt-2 text-gray-600 text-center px-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
            quaerat unde quam dolor culpa veritatis inventore, aut commodi eum
            veniam vel.
          </p>
          <hr className="mt-16 mb-16 sm:sm:mb-10 md:mx-10" />
        </div>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto sm:mt-20">
          <div className="grid grid-cols-1 mx-2 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-[13px] text-gray-900 "
              >
                Your Name *
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7] "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block  text-gray-900 text-[13px]"
              >
                Your Email *
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="block  text-gray-900 text-[13px]"
              >
                Subject *
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  autoComplete="subject"
                  className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-gray-900 text-[13px]"
              >
                Your Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full  border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mx-2 mt-10 mb-10">
            <button
              type="submit"
              className="rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContactForm;
