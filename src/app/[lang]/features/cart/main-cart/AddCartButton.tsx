'use client'
import {useEffect, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Swal from "sweetalert2";
import useCartProductsHook from "@/app/[lang]/components/Hooks/useCartProductsHook";

const AddCartButton = (product: any) => {
    const [newCount, setNewCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const {
        addCartProductsToCart,
    } = useCartProductsHook()


    /* useEffect(() => {
         if (product.product.count > product.product.quantity) {
             setNewCount(product.product.quantity)
         } else {
             setNewCount(product.product.count)
         }
     }, [product.product.count, product.product.quantity])*/

    const handleIncrement = () => {
        setNewCount(prevState => prevState + 1);

    };

    const handleDecrement = () => {
        if (newCount > 0) {
            setNewCount(prevState => prevState - 1)
        } else {

        }
    };
    const handleInputChange  = (q: number) => {
            setNewCount(q);
    }

    const handleAddtoCart = () => {
        console.log(product.product.quantity, newCount)

        if ((product.product.quantity != 0) && (product.product.quantity >= newCount)) {
            if(newCount !== 0){
                addCartProductsToCart({...product.product, count: newCount})
                const title = product.product.product_name + " has been added to your cart"
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

        } else
            Swal.fire({
                title:
                    '<span style="font-size: 18px">Cannot add more than the available quantity</span>',
                width: 400,
                timer: 2000,
                // padding: '3',
                color: "white",
                background: "#f6490a",
                showConfirmButton: false,
                heightAuto: true,
                position: "bottom-end",
            });

    }

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
                        <input type="number" name="quantity"
                               className="appearance-none w-12 border p-1 text-center"
                               value={newCount ? newCount : ""}
                               onChange={(e) => handleInputChange(isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10))}
                               disabled={product.product.expired == true}/>
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
                className={`rounded-full p-1  ${product.product.expired ? 'bg-gray-50' : 'bg-primary'}`}
                onClick={handleAddtoCart}
            >
                <AiOutlineShoppingCart
                    className={`text-xl font-semibold  ${product.product.expired ? 'text-gray-400' : 'text-white'}`}/>

            </button>
        </div>
    );
}

export default AddCartButton;