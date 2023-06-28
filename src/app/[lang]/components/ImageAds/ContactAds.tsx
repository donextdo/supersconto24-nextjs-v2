'use client'
import { useRouter } from "next/navigation";

const ContactAds = () => {
    const router = useRouter()


    const handleClick = () => {
        router.push("/contact")

    }
    return ( 
        <div className="h-[430px] border flex flex-col justify-center p-10 space-y-10 mt-9">
                <h1 className="text-sm font-bold text-center">
                Want to know about Us? Contact Us for more information!
                </h1>

                <button className="bg-primary text-white p-2 rounded-md" onClick={handleClick}>Check more</button>
        </div>
     );
}
 
export default ContactAds;