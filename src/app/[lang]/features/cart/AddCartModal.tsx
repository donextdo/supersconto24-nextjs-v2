import Image, { StaticImageData } from "next/image";
import bn from "../assets/items/banana.jpg";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItemQuantity } from "../../features/cart/cartSlice";
import { updateProductQuantity } from "../../features/product/productSlice";
import { RootState } from "../../redux/store";
import { Product } from "../../features/product/product";

interface Item {
    product_image: string;
    unit_price: number;
    totalAmount: number;
    product_name: string;
    _id: string;
    quantity: number
    isRecommended: boolean;
    isDiscount: boolean;
    isOrganic: boolean;
    isFavourite: boolean;
    discount: number;
    rating: number;
    front: string;
    back: string;
    side: string;
    title: string;
    isAvailable: boolean;
    price: number;
    brand: string;
    description: string;
    productQuantity: number;
    skuNumber: string;
    count: number;
    newprice: number;
    type: string;
    review: number;
    mfgDate: string;
    life: string;
    product_description: string;

}

interface Props {
    item: Item,
    handler: MouseEventHandler<HTMLButtonElement>
    setChangecolor : any
    
}

const AddToCartModal: React.FC<Props> = ({ item, handler, setChangecolor }) => {
    // const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products) as Product[];

    

    // useEffect(() => {
    //     const cartItems: [any] = JSON.parse(localStorage.getItem("cartItems")!) ?? []

    //     const product = cartItems.find(it => it._id === item._id)
    //     if (product) {
    //         setCount(product.quantity >= item.quantity ? item.quantity : product.quantity)
    //     }
    // }, [item])
    console.log(item)

   const prodcutone:any = products.find((product) => product._id === item._id);
    console.log(prodcutone)



    useEffect(()=>{
        
    })

    const decreaseClick = () => {
        // if (count > 0) {
        //     setCount(prevState => prevState - 1);
        // } else {
        //     setCount(0);
        // }
        const newQuantity = Math.max((prodcutone?.count || 0) - 1, 0);
        dispatch(updateItemQuantity({ itemId: item._id, count: newQuantity }));
        dispatch(
            updateProductQuantity({ productId: item._id, count: newQuantity })
        );
        if (item.count === 1) {
            // dispatch(removeFromCart(id))
            // setIsAddToCart(false)
        }
    };

    const increaseClick = () => {
        // setCount(prevState => {
        //     if (prevState + 1 >= item.quantity) {
        //         return item.quantity
        //     }
        //     return prevState + 1
        // });
        const newQuantity = (prodcutone?.count || 0) + 1;
        dispatch(updateItemQuantity({ itemId: item._id, count: newQuantity }));
        dispatch(
            updateProductQuantity({ productId: item._id, count: newQuantity })
        );

    };

    console.log({ item })

    return (

        <div className="fixed inset-0 z-50 grid bg-opacity-75 place-items-center bg-slate-900">

            <div className="md:py-6 py-0 pt-3 px-4 flex md:gap-6 flex-col relative bg-white shadow-md rounded-md w-[60vw]">

                <div className="bg-white rounded-full text-end">
                    <button className="px-3 text-xl font-bold text-black md:px-6" onClick={handler}>X</button>
                </div>

                <section className="md:gap-4 md:flex">
                    {/* 1st */}
                    <div className="md:mt-2 h-[50vh]  md:w-4/6   md:ml-4 relative">
                        <Image src={item.product_image} fill style={{ objectFit: "contain" }} alt={item.product_name} />
                    </div>
                    {/* 2nd */}
                    <div className="mx-5 md:mt-8 md:mx-10 md:w-1/2 md:col-2 md:span-2" >
                        <div>
                            <p className="text-2xl font-bold text-center md:text-left">{item.product_name}</p>
                        </div>
                        <div className="flex gap-4 mt-6 md:gap-16 flex-raw">
                            <div className="text-lg ">${item.unit_price}</div>
                            {/* <div className="flex flex-raw ">
                                <div>
                                    <button
                                        className="px-3 text-lg text-white bg-black"
                                        onClick={decreaseClick}
                                    >
                                        -
                                    </button>
                                </div>
                                <div>
                                    <p className="w-10 text-lg text-center bg-gray-300">{count}</p>
                                </div>
                                <div>
                                    <button
                                        className="px-3 text-lg text-white bg-black "
                                        onClick={increaseClick}
                                    >
                                        +
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        <div className="mt-5 text-lg ">${item.unit_price * prodcutone?.count || 0}</div>

                        <div className=" mt-10 mb-5 md:mt-10 md:mb-0">
                        {/* { (item.count ==undefined || item.count<1) && (
                            <button disabled={count === 0} className="disabled:opacity-50 bg-[#8DC14F]  px-2 py-[8px] rounded w-full" onClick={(e) => {
                                const cartItems: [any] = JSON.parse(localStorage.getItem("cartItems")!) ?? []
                                const product = cartItems.find(it => it._id === item._id)
                                if (product) {
                                    product.quantity = count
                                } else {
                                    cartItems.push({ _id: item._id, quantity: count })
                                }
                                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                                handler(e);
                                dispatch(addItem(item));
                                const newQuantity = (item.count || 0) + 1;
                                dispatch(
                                    updateProductQuantity({ productId: item._id, count: newQuantity })
                                );
                            }}>
                                Add to cart
                            </button>
                            )} */}
                             { (prodcutone?.count ==undefined || prodcutone?.count<1) && (
                            <button  className="disabled:opacity-50 bg-[#8DC14F]  px-2 py-[8px] rounded w-full" onClick={(e) => {
                                // const cartItems: [any] = JSON.parse(localStorage.getItem("cartItems")!) ?? []
                                // const product = cartItems.find(it => it._id === item._id)
                                // if (product) {
                                //     product.quantity = count
                                // } else {
                                //     cartItems.push({ _id: item._id, quantity: count })
                                // }
                                // localStorage.setItem("cartItems", JSON.stringify(cartItems))
                                // handler(e);
                                dispatch(addItem(item));
                                const newQuantity = (prodcutone?.count || 0) + 1;
                                dispatch(
                                    updateProductQuantity({ productId: item._id, count: newQuantity })
                                );
                                console.log(prodcutone?.count)

                                setChangecolor(true)
                                const map = new Map();
    map.set('product_id', prodcutone?._id);
    map.set('isClicked', true);

    // Convert the map to a string using JSON serialization
    const mapString = JSON.stringify(Array.from(map.entries()));

    // Save the map string in the session storage
    sessionStorage.setItem('mapData', mapString);
                            }}>
                                Add to cart
                            </button>
                            )}
                            {prodcutone?.count >= 1 && (
                            <div className="flex flex-raw ">
                                <div>
                                    <button
                                        className="px-3 text-lg text-white bg-black"
                                        onClick={decreaseClick}
                                    >
                                        -
                                    </button>
                                </div>
                                <div>
                                    <p className="w-10 text-lg text-center bg-gray-300">{prodcutone?.count}</p>
                                </div>
                                <div>
                                    <button
                                        className="px-3 text-lg text-white bg-black "
                                        onClick={increaseClick}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                             )} 
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AddToCartModal;
