import Image from "next/image";
import {IoClose} from "react-icons/io5";
import {useMemo} from "react";

const CartPopupCard = ({item, handleRemove, getPrice}: any) => {

    const {discountedPrice, newPrice} = useMemo(() => {
        let discountedPrice = 0
        let newPrice = 0

        if (item.discount) {
            discountedPrice = item.unit_price * (item.discount / 100);
            newPrice = item.unit_price - discountedPrice;
        } else {
            newPrice = item.unit_price;
        }

        return {discountedPrice, newPrice}
    }, [item])

    return (
        <div className=" grid grid-cols-3 w-[258px] mb-4 pt-2 relative">
            <div className="text-left h-20  border-b border-[#e3e4e6] ">
                <Image
                    src={item.product_image}
                    alt="product"
                    style={{objectFit: "contain", backgroundColor: "white", width: "100%", height: "100%"}}
                    width={450}
                    height={400}
                />
            </div>
            <div className={`col-span-2 text-left py-2 h-20 border-b border-[#e3e4e6] pl-2 ${item.expired? 'bg-gray-300 pointer-events-none ':''}`}>
                <p className="text-xs ">{item.product_name}</p>
                <p className="text-xs mt-2">{item.count || 0} × <span
                    className="text-[#008C45]"> {getPrice(newPrice)}</span></p>
                    {item.expired && (
                <p className="text-xs mt-2">expire</p>
                    )}

            </div>
            <button className="absolute bg-[#008C45] rounded-full p-0.5 text-white left-4 top-4"
                    onClick={() => handleRemove(item)}><IoClose className="text-white text-xs"/></button>
        </div>
    );
}

export default CartPopupCard;