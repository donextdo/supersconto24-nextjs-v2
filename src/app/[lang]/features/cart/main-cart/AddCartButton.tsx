'use client'
import {useEffect, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";
import useCartProductsHook from "@/app/[lang]/components/Hooks/useCartProductsHook";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";

const AddCartButton = (product: any) => {
    const [newCount, setNewCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const {
        cartProducts,
        cartProductsCount,
        cartProductsAmount,
        addCartProductsToCart,
        removeCartProductFromCart,
        fetchCartProduct
    } = useCartProductsHook()


    useEffect(() => {
        if (product.product.count > product.product.quantity) {
            setNewCount(product.product.quantity)
        } else {
            setNewCount(product.product.count)
        }
    }, [product.product.count, product.product.quantity])

    const handleIncrement = () => {
        setNewCount(prevState => prevState + 1);
        addCartProductsToCart({...product.product, count: 1})

    };

    const handleDecrement = () => {
        if (newCount > 0) {
            setNewCount(prevState => prevState - 1)
            removeCartProductFromCart({...product.product, count: 1})

        } else {

        }
    };

    const handleAddtoCart = () => {
        console.log(product.product.quantity, newCount)

        if ((product.product.quantity != 0) && (product.product.quantity >= newCount))
            addCartProductsToCart({...product.product, count: newCount})
        else
            Swal.fire({
                title:
                    '<span style="font-size: 18px">Cannot add more than the available quantity</span>',
                width: 400,
                timer: 1500,
                // padding: '3',
                color: "white",
                background: "#00B853",
                showConfirmButton: false,
                heightAuto: true,
                position: "bottom-end",
            });

    }

    return (
        <div className="relative" onMouseEnter={() => product.product.quantity > 0 && setIsHovered(true)}
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
                className={`bg-[#e5e7eb] rounded-full p-1 ${product.product.quantity <= newCount ? 'pointer-events-none cursor-not-allowed' : ''}`}
                onClick={handleAddtoCart}
            >
                <AiOutlineShoppingCart className="text-xl font-semibold text-black"/>

            </button>
        </div>
    );
}

export default AddCartButton;