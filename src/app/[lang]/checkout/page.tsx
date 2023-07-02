import {Metadata} from "next";
import Checkout from "@/app/[lang]/components/Checkout/Checkout";

export const metadata: Metadata = {
    title: "Supersconto | Checkout"
}
const checkout = () => {
    return (
        <div>
            <Checkout/>
        </div>
    );
}

export default checkout;