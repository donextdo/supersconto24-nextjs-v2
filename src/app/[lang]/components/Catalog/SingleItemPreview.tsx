import React from 'react';
import Image from "next/image";
import marked from '../../../../../assets/right/marked.png'
import {Product} from '../../features/product/product';


interface Props {
    strokeImageUrl: string,
    coordinates: any,
    imageWidth: number,
    imageHeight: number,
    width: number,
    height: number
    handleSelection: (data: any) => void
    cartItems:Product[]

}

const SingleItemPreview: React.FC<Props> = ({
                                                strokeImageUrl,
                                                coordinates,
                                                imageWidth,
                                                imageHeight,
                                                handleSelection,
                                                width,
                                                height,
                                                cartItems

                                            }) => {



    console.log({width, height, imageWidth, imageHeight,scaleX : width / imageWidth, scaleY : height / imageHeight, coordinates})

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
                    const isAdded = cartItems.some((p) => p._id === crop.id)
                    return (

                        <div className="selection-div" key={`interactive-div-${index}`} style={{
                            background: "none",
                            opacity: 1,
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
                                    width: `${crop.width * scaleX }px`,
                                    height: `${crop.height * scaleY }px`,

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


