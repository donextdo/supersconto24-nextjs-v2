import CaPopup from "@/app/[lang]/components/NewProduct/CaPopup";
import Cart from "@/app/[lang]/features/cart/main-cart/Cart";



const viewcart = () => {
    return ( 
        <div>
            {/* <CaPopup image={""} title={""} subtotal={0} /> */}
            <Cart image={""} title={""} subtotal={0} />
        </div>
     );
}
 
export default viewcart;