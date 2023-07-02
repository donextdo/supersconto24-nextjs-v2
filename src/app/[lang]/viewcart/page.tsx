import Cart from "@/app/[lang]/features/cart/main-cart/Cart";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "Supersconto | View cart"
}
const viewcart = () => {
    return ( 
        <div>
            <Cart image={""} title={""} subtotal={0} />
        </div>
     );
}
 
export default viewcart;