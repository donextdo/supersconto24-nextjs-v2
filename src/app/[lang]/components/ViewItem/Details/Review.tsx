import Image from "next/image";
import { FC, JSXElementConstructor, ReactElement, ReactFragment, useEffect, useState } from "react";
import propic from "../../../../assets/66bb43111be7a320df1ed27c2945483c.jpg"
import axios from "axios";
import UserProfile from "./UserProfile ";
import { FaStar } from "react-icons/fa";
import StartRating from "./ReviewDetails/StartRating";
import DateFormatChange from "./ReviewDetails/DateFormatChange";
import { useRouter } from "next/navigation";
import baseUrl from "../../../../../../utils/baseUrl";
import useAuthCheckHook from "../../Hooks/useAuthCheck";

interface Review {
    rating: number;
    name: string;
    body: string;
    submittedDate: string;
    _id: string;
    reviewStatus:string
    // other properties
}

const Review = ({ itemId }: any) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [savedText, setSavedText] = useState("");
    const [data, setData] = useState<Array<Review>>([])
    const { isLoggedIn, authUser, logOut } = useAuthCheckHook()
    const router = useRouter();



    let email: string | null;
    let username;
    let extractedUsername: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined;

    // review name
    if (authUser) {
        if (authUser?.email !== null) {
            username = authUser?.email.split("@")[0]; // Extract the username from the email
            extractedUsername = username.replace(/"/g, "");
        } else {
            // Handle the case when the email value is null
        }
    } else {
        // Handle the case when the value is null
        // For example, you could set a default value
    }

    useEffect(() => {
        fetchData();
    }, []);



    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/reviews/getReview/${itemId}`);
            console.log(res.data)
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    // submit savetext
    const handleSubmit = async () => {
        console.log({authUser})
        console.log("hi")
        if (authUser?._id) {
            const review = text

            const data = {
                body: review,
                name: extractedUsername,
                rating: rating,
                userId: authUser._id,
                productId: itemId
            }

            console.log(data)

            if (rating > 0 && review) {
                try {
                    //authentication session handle
                const token = authUser?.token // Retrieve the token from local storage or wherever it's stored
                if (!token) {
                alert("Session expired")
                //   router.push("/account");
                  return;
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${token}`,
                        'Accept': "application/json"
                      }
                };

                    const response = await axios.post(`${baseUrl}/reviews/insert`, data, config);
                    console.log(response.data); // do something with the response data
                    setText("");

                } catch (error) {
                    console.log(error); // handle the error
                    // alert("Session expired")
                    // router.push("/account");
                }
            } else {
                alert("please add a rating and review")
            }
        } else {
            // router.push('/account');
        }
        
    };



    // review body
    const handleTextChange = (event: any) => {
        setText(event.target.value);
    };

    // rating 
    const buttonValues = [1, 2, 3, 4, 5];

    const handleRatingClick = (rating: any) => {
        console.log(rating)
        setRating(rating);
    };

   
    return (
        <div>
            <h1> REVIEW FOR ALL NATURAL ITALIAN-STYLE CHICKEN MEATBALLS</h1>
            {data.map((review) => (
                review.reviewStatus === "approved" && (
                <div className="flex mt-4" key={review._id}>
                    <div className="h-10 w-10 rounded-full bg-[#233a95] flex items-center justify-center text-white text-xl">
                        {/* <Image
                        src={propic}
                        alt="item1"
                        style={{
                            objectFit: "contain",
                            backgroundColor: "white",
                            width: "100%",
                            height: "100%",
                        }}
                        width={450}
                        height={400}
                    /> */}
                        <UserProfile email={review.name} />
                    </div>
                    <div className="ml-[15px] space-y-1.5">
                        <div>
                            <StartRating rating={review.rating} />

                        </div>
                        <h1>{review.name} - <span className="text-xs text-[#71778e]"> <DateFormatChange newDate={review.submittedDate} /></span></h1>
                        <p className="text-[13px]">{review.body}</p>
                    </div>
                </div>
            )))}

            <h1 className="text-lg mt-10 mb-2.5">Add a review</h1>
            <hr />
            <h4 className="mt-6 text-[13px]">Your rating *</h4>
            <div>
                {buttonValues.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleRatingClick(value)}
                    >
                        <FaStar className={`${rating >= value ? 'text-yellow-400' : 'text-gray-200'}`} />
                    </button>
                ))}
            </div>
            <h4 className="mt-3 mb-2 text-[13px]">Your review *</h4>
            <textarea className="w-full h-60 bg-gray-100 rounded-sm px-4" value={text}
                onChange={handleTextChange}></textarea>
            <button onClick={()=>{
                console.log("review submit")
                handleSubmit()
            }} className="px-4 py-2 bg-[#233a95] text-white text-sm mt-4 rounded-md cursor-pointer w-[90px]">
                Submit
            </button>

        </div>
    );
}

export default Review;