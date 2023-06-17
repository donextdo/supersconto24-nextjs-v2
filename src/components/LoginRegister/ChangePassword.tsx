import { useState } from "react";

const ChangePassword = () => {
    const [newPassword, setNewPassword] =  useState()
    const [confirmPassword, setConfirmPassword] =  useState()

    return (
        <div className="mt-10 container mx-auto xl:px-40 px-5">
            <div className="w-full mx-2">
                <label htmlFor="password" className="block text-[13px] text-gray-900 mt-5">
                    New Passowrd
                </label>
                <div className="mt-2.5">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={newPassword}
                        // onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="password"
                        required
                        className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                    />
                </div>
            </div>
            <div className="w-full mx-2 mt-4">
                <label htmlFor="password" className="block text-[13px] text-gray-900 mt-5">
                    Confirm Passowrd
                </label>
                <div className="mt-2.5">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={confirmPassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="password"
                        required
                        className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                    />
                </div>
            </div>

            <button
          type="submit"
          className=" rounded-md block bg-[#233a95] text-center text-sm font-semibold text-white w-[150px] h-[40px] my-4 mx-2"
        //   onClick={handleUser}
        >
          Reset password
        </button>

        </div>
    );
}

export default ChangePassword;