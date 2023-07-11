'use client'
import { useState } from "react";

const LostPasswordPage = () => {
    const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUser = async (e:any) => {
    e.preventDefault();

    

  };
    return ( 
        <div className=" mt-10 container mx-auto xl:px-40 px-5">
     
      <div className=" mt-10 ">
        <p className="text-black text-sm font-normal">
          Lost your password? Please enter your email address. You
          will receive a link to create a new password via email.
        </p>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="password" className="block text-[13px] text-gray-900 mt-5">
          Email
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="password"
            required
            className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
          />
        </div>
      </div>
      <div className="mt-5  mb-2">
        <button
          type="submit"
          className=" rounded-md block bg-primary text-center text-sm font-semibold text-white w-[150px] h-[40px]"
          onClick={handleUser}
        >
          Reset password
        </button>
      </div>
      <p>{message}</p>
    </div>
     );
}
 
export default LostPasswordPage;