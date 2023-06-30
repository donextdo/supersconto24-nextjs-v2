import React, { useEffect, useState } from 'react';
import Image from "next/image";
import marked from '../../../../../assets/right/marked.png'
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../../features/product/product';
import {RootState} from '../../redux/store';


interface Props {
    strokeImageUrl: string,
    coordinates: any,
    imageWidth: number,
    imageHeight: number,
    width: number,
    height: number
    handleSelection: (data: any) => void
    changecolor: any

}

const SingleItemPreview: React.FC<Props> = ({
                                                strokeImageUrl,
                                                coordinates,
                                                imageWidth,
                                                imageHeight,
                                                handleSelection,
                                                width,
                                                height,
                                                changecolor,

                                            }) => {

    // const products = useSelector((state: RootState) => state.cart.items) as Product[];

    const [products, setProducts] = useState<Product[]>([]);
    

    useEffect(() => {
        const cartItemsString = localStorage.getItem("cartItems");
        const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
        setProducts(cartItemsArray);
    }, []);

    console.log({width, height, imageWidth, imageHeight, coordinates, products})

    return (

        <div style={{position: "relative", maxWidth: width, height, userSelect: "none"}}>
            {strokeImageUrl && <>
                <div style={{
                    maxWidth: width,
                    height,
                    width,
                    background: `url(${strokeImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}/>
                {coordinates.map((crop: any, index: number) => {
                    const scaleX = width / imageWidth;
                    const scaleY = height / imageHeight;
                    const isAdded = products.some((p) => p._id === crop.id)
                    return (

                        <div className="selection-div" key={`interactive-div-${index}`} style={{
                            background: "white",
                            opacity: 0.5,
                            width: crop.width * scaleX,
                            height: crop.height * scaleY,
                            transform: `translate(${crop.x * scaleX}px, ${crop.y * scaleY}px)`
                        }} onClick={() => handleSelection({
                            crop: {...crop, imageWidth, imageHeight},
                            index,
                            imageWidth,
                            imageHeight,
                            itemId: crop.id,
                            itemName: crop.name
                        })}>
                            {isAdded && <Image
                                src={marked}
                                alt="LOGO"
                                className='h-11 sm:h-9 md:h-11 w-auto'
                                style={{
                                    width: `${crop.width * scaleX * 0.8}px`,
                                    height: `${crop.height * scaleY * 0.8}px`,

                                }}
                            />}

                        </div>
                    )
                })}
            </>}
        </div>
    );
}

export default SingleItemPreview;


