'use client'
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const AddCartButton = (product: any) => {
    const [newCount, setNewCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(()=>{
        if(product.product.count > product.product.quantity){
            setNewCount(product.product.quantity)
        } else {
            setNewCount(product.product.count)

        }
    },[])

    const handleIncrement = () => {
        setNewCount(newCount + 1);
    };

    const handleDecrement = () => {
        if (newCount > 0) {
            setNewCount(newCount - 1);
        }
    };

    const handleAddtoCart = () => {
        const cartItemsString = localStorage.getItem("cartProducts");
        const items = cartItemsString ? JSON.parse(cartItemsString) : [];

        const itemIndex = items.findIndex((item: any) => item._id === product._id);

        if (itemIndex === -1) {
            const newItem = { ...product.product, count: newCount };
            items.push(newItem);
            localStorage.setItem("cartProducts", JSON.stringify(items));

        } else {
            items[itemIndex].count = newCount;
            localStorage.setItem("cartProducts", JSON.stringify(items));

        }

    }

    console.log(product.product.quantity)
    return (
        <div className="relative" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {isHovered && (
                <div className="absolute bottom-full left-0 bg-white border border-gray-300 p-2 rounded shadow">
                    <div className="flex items-center space-x-2">
                        <button
                            className="bg-gray-300 px-2 py-1 rounded"
                            onClick={handleDecrement}
                        >
                            -
                        </button>
                        <span className="text-xl">{newCount}</span>
                        <button
                            className={`bg-gray-300 px-2 py-1 rounded ${product.product.quantity <= newCount ? 'pointer-events-none cursor-not-allowed' : ''}`}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
            <button
                className="bg-[#e5e7eb] rounded-full p-1"
                onClick={handleAddtoCart}
            >
                <AiOutlineShoppingCart className="text-xl font-semibold text-black" />

            </button>
        </div>
    );
}

export default AddCartButton;