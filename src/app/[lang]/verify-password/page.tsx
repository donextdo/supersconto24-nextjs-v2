'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import baseUrl from "../../../../utils/baseUrl";

const VerifyPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isverify, setIsverify] = useState(false);
    const searchParams = useSearchParams();


    useEffect(() => {
        
        const t = searchParams.get("t");
        const u = searchParams.get("u");
        if (t && u) {
            fetchData();
        }
       
      }, [searchParams]);

      const fetchData = async () => {  
        try {
          const res = await axios.get(`${baseUrl}/auth/verify-password`);
          console.log(res.data);
          // setIsverify(res.data);
        } catch (err) {
          console.log(err);
        }
      
    };

    const handlePassword = async (e: any) => {
        e.preventDefault();
        if(password == confirmPassword){
            
        }
      };

    return (
        <div>
             {isverify && (
                <div className=" mt-10 container mx-auto xl:px-40 px-5">

                <div className=" mt-10 ">
                    <p className="text-black text-sm font-normal">
                        Create a new password
                    </p>
                </div>
                <div className="">
                    <label htmlFor="password" className="block text-[13px] text-gray-900 mt-5">
                        Password
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block text-[13px] text-gray-900 mt-5">
                        Confirm Password
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                        />
                    </div>
                </div>
                <div className="mt-5  mb-2">
                    <button
                        type="submit"
                        className=" rounded-md block bg-primary text-center text-sm font-semibold text-white w-[150px] h-[40px]"
                        onClick={handlePassword}
                    >
                        Reset password
                    </button>
                </div>
    
            </div>
             )}
        </div>
       
        
    );
}

export default VerifyPassword;