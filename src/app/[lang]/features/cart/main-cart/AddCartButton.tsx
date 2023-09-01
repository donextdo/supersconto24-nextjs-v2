'use client'
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Swal from "sweetalert2";

const AddCartButton = (product: any) => {
    const [newCount, setNewCount] = useState<number>(0);
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

        const title = product.product.product_name +  " has been added to your cart"
        Swal.fire({
            title: `<span style="font-size: 18px">${title}</span>`,
            width: 400,
            timer: 1500,
            color: "white",
            background: "#00B853",
            showConfirmButton: false,
            heightAuto: true,
            position: "bottom-end",
        });
    }

    console.log(product.product.quantity)
    return (
        <div className="relative" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {isHovered && (
                <div className="absolute bottom-full left-0 bg-white border border-gray-300 p-2 rounded shadow">
                    <div className="flex items-center space-x-2">
                        <button
                            className="bg-gray-300 w-8 h-8 rounded"
                            onClick={handleDecrement}
                        >
                            -
                        </button>
                        {/* <span className="text-xl">{newCount}</span> */}
                        <input type="number" value={newCount} name="quantity" onChange={(e) => setNewCount(parseInt(e.target.value, 10))} disabled={product.product.expired==true}  className="appearance-none w-12 border p-1 text-center"/>
                        <button
                            className={`bg-gray-300 w-8 h-8 rounded ${product.product.quantity <= newCount ? 'pointer-events-none cursor-not-allowed' : ''}`}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
            <button
             className={ `rounded-full p-1  ${product.product.expired ? 'bg-gray-50' : 'bg-primary'}`}
                onClick={handleAddtoCart}
            >
                <AiOutlineShoppingCart className={`text-xl font-semibold  ${product.product.expired ? 'text-gray-400' : 'text-white'}`}  />

            </button>
        </div>
    );
}

export default AddCartButton;