import axios from "axios";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import React, { useState } from "react";
import baseUrl from "../../../utils/baseUrl";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

// const Register: React.FC<Props> = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [validationMsg, setValidationMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState<React.ReactNode>("");
//   const [isDisabled, setIsDisabled] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsLoading(true);

//     const data = {
//       email: email,
//       password: password,
//       userName: email,
//     };
//     const details = {
//       email: email,
//       password: password,
//     };
//     try {
//       const response = await axios.post(`${baseUrl}/users/register`, data);
//       console.log(response.data);
//       if (response.status == 201) {
//         Swal.fire({
//           title: '<span style="font-size: 18px">Congratulations, your account has been successfully created.</span>',
//           width: 400,
//           timer: 2000,
//           // padding: '3',
//           color: 'white',
//           background : '#00B853',
//           showConfirmButton: false,
//           heightAuto: true,
//           position: 'bottom',
//         })
//         try {
//           const response = await axios.post(`${baseUrl}/users/login`, details);
//           console.log(response.data);
//           localStorage.setItem("token", response.data.token);

//           localStorage.setItem("id", response.data._id);
//           localStorage.setItem("email", response.data.email);
//           localStorage.setItem("order", JSON.stringify([]));

//           if (response.status == 200 || response.status == 201  ) {
//           location.reload();
//             router.push("/account");
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       if (error) {
//         const errorData = error;
//         if (errorData) {
//           setErrorMsg(errorData.toString());
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   async function handleClick() {
//     setIsLoading(true);
//     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
//     if (!email) {
//       setErrorMsg("Please provide a valid email address.");
//     } else if (!emailRegex.test(email)) {
//       setErrorMsg("Please provide a valid email address.");
//     } else if (!password) {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/users/getUser/${email}`
//         );
//         console.log("response", response);
//         console.log("user = ", response);
//         if (response.status == 200) {
//           setErrorMsg(
//             <>
//               An account is already registered with your email address.{" "}
//               <Link
//                 className="text-cyan-400 text-sm font-medium cursor-pointer hover:text-[#233a95] hover:underline"
//                 href="/login"
//               >
//                 Please log in
//               </Link>
//               .
//             </>
//           );
//         } else {
//           setErrorMsg("");
//         }
//         console.log(response);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     setIsLoading(false);
//   }

//   function handlePasswordChange(e: any) {
//     const value = e.target.value;
//     setPassword(value);
//     console.log("vhgdyu : ", value);
//     if (!value) {
//       setValidationMsg("");
//       setIsDisabled(false);
//     } else if (value.length < 9) {
//       setValidationMsg("Password must be at least 9 characters long");
//       setIsDisabled(true);
//     } else if (!value.match(/[A-Z]/)) {
//       setValidationMsg("Password must contain at least one uppercase letter");
//       setIsDisabled(true);
//     } else if (!value.match(/[a-z]/)) {
//       setValidationMsg("Password must contain at least one lowercase letter");
//       setIsDisabled(true);
//     } else if (!value.match(/[0-9]/)) {
//       setValidationMsg("Password must contain at least one number");
//       setIsDisabled(true);
//     } else if (!value.match(/[\W_]/)) {
//       setValidationMsg("Password must contain at least one symbol");
//       setIsDisabled(true);
//     } else {
//       setValidationMsg("Medium");
//       setIsDisabled(false);
//     }
//   }

//   return (
//     <>
//       <div className="max-w-lg mx-auto border-t-0">
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 mb-16">
//           <div className="mx-2 gap-y-6 gap-x-8 ">
//             <div>
//               <label htmlFor="email" className="block text-sm text-gray-900 ">
//                 Email address *
//               </label>
//               <div className="mt-3">
//                 <input
//                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   type="email"
//                   name="email"
//                   id="email"
//                   autoComplete="email"
//                   required
//                   className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7] "
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="password"
//                 className="block text-sm text-gray-900 mt-5"
//               >
//                 Password *
//               </label>
//               <div className="mt-3">
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   autoComplete="password"
//                   required
//                   className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//                 {validationMsg && (
//                   <div>
//                     <div
//                       className={`text-sm font-bold ${
//                         validationMsg === "Medium"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {validationMsg}
//                     </div>
//                     <p className="justify-center  text-[12px] text-gray-600 mt-3">
//                       Hint: The password should be at least twelve characters
//                       long. To make it stronger, use upper and lower case
//                       letters, numbers, and symbols like ! ? $ % ^ ; *.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="pl-3 mt-3">
//             <span className="justify-center  text-[12px] text-gray-600">
//               Your personal data will be used to support your experience
//               throughout this website, to manage access to your account, and for
//               other purposes described in our{" "}
//               <Link className="text-red-600 cursor-pointer" href="/privacy-policy">privacy policy</Link>.
//             </span>
//           </div>

//           <div className="mx-2 mt-5 mb-10 ">
//             <button
//               type="submit"
//               className={`rounded-md w-full block bg-[#233a95] px-3.5 py-2.5 text-center text-sm font-semibold text-white ${
//                 isLoading ? "loading" : ""
//               } ${isDisabled ? "opacity-60" : ""}`}
//               onClick={handleClick}
//               // disabled={Boolean(validationMsg)}
//             >
//               {isLoading ? "Loading..." : "Register"}
//             </button>
//           </div>
//           {errorMsg && (
//             <div className="border border-gray-300 p-3 text-sm pl-3 mx-2">
//               {errorMsg && <div className="text-black text-sm">{errorMsg}</div>}
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState<React.ReactNode>("");
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      password: password,
      userName: email,
    };
    const details = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${baseUrl}/users/register`, data);
      console.log(response.data);
      if (response.status == 201 || response.status == 200) {
        console.log("dwddq")
        Swal.fire({
          title: '<span style="font-size: 18px">Congratulations, your account has been successfully created.</span>',
          width: 400,
          timer: 2000,
          // padding: '3',
          color: 'white',
          background : '#00B853',
          showConfirmButton: false,
          heightAuto: true,
          position: 'bottom',
        })
        try {
          console.log("dwddwd")
          const response = await axios.post(`${baseUrl}/users/login`, details);
          console.log(response.data);
          localStorage.setItem("token", response.data.token);

          localStorage.setItem("id", response.data._id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("order", JSON.stringify([]));

          if (response.status == 200 || response.status == 201) {
          location.reload();
            router.push("/account");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      if (error) {
        const errorData = error;
        if (errorData) {
          setErrorMsg(errorData.toString());
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  async function handleClick() {
    setIsLoading(true);
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!email) {
      setErrorMsg("Please provide a valid email address.");
    } else if (!emailRegex.test(email)) {
      setErrorMsg("Please provide a valid email address.");
    } else if (!password) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/getUser/${email}`
        );
        console.log("response", response);
        console.log("user = ", response);
        if (response.status == 200) {
          setErrorMsg(
            <>
              An account is already registered with your email address.{" "}
              <Link
                className="text-cyan-400 text-sm font-medium cursor-pointer hover:text-[#233a95] hover:underline"
                href="/login"
              >
                Please log in
              </Link>
              .
            </>
          );
        } else {
          setErrorMsg("");
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  }

  function handlePasswordChange(e: any) {
    const value = e.target.value;
    setPassword(value);
    console.log("vhgdyu : ", value);
    if (!value) {
      setValidationMsg("");
      setIsDisabled(false);
    } else if (value.length < 9) {
      setValidationMsg("Password must be at least 9 characters long");
      setIsDisabled(true);
    } else if (!value.match(/[A-Z]/)) {
      setValidationMsg("Password must contain at least one uppercase letter");
      setIsDisabled(true);
    } else if (!value.match(/[a-z]/)) {
      setValidationMsg("Password must contain at least one lowercase letter");
      setIsDisabled(true);
    } else if (!value.match(/[0-9]/)) {
      setValidationMsg("Password must contain at least one number");
      setIsDisabled(true);
    } else if (!value.match(/[\W_]/)) {
      setValidationMsg("Password must contain at least one symbol");
      setIsDisabled(true);
    } else {
      setValidationMsg("Medium");
      setIsDisabled(false);
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto border-t-0">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 mb-16">
          <div className="mx-2 gap-y-6 gap-x-8 ">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-900 ">
                Email address *
              </label>
              <div className="mt-3">
                <input
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7] "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm text-gray-900 mt-5"
              >
                Password *
              </label>
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  required
                  className="block w-full border-0 py-2 px-3.5 text-gray-900 bg-[#f3f4f7]"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {validationMsg && (
                  <div>
                    <div
                      className={`text-sm font-bold ${
                        validationMsg === "Medium"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {validationMsg}
                    </div>
                    <p className="justify-center  text-[12px] text-gray-600 mt-3">
                      Hint: The password should be at least twelve characters
                      long. To make it stronger, use upper and lower case
                      letters, numbers, and symbols like ! ? $ % ^ ; *.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pl-3 mt-3">
            <span className="justify-center  text-[12px] text-gray-600">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <Link className="text-red-600 cursor-pointer" href="/privacy-policy">privacy policy</Link>.
            </span>
          </div>

          <div className="mx-2 mt-5 mb-10 ">
            <button
              type="submit"
              className={`rounded-md w-full block bg-[#233a95] px-3.5 py-2.5 text-center text-sm font-semibold text-white ${
                isLoading ? "loading" : ""
              } ${isDisabled ? "opacity-60" : ""}`}
              onClick={handleClick}
              // disabled={Boolean(validationMsg)}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
          {errorMsg && (
            <div className="border border-gray-300 p-3 text-sm pl-3 mx-2">
              {errorMsg && <div className="text-black text-sm">{errorMsg}</div>}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Register;
