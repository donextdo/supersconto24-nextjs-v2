import React, {useState, useRef, useEffect, useCallback} from 'react';
import {log} from "util";
import SingleItemPreview from '../Catalog/SingleItemPreview';
import { NextArrowCircle, PrevArrowCircle } from '../CatalogOneItem/CatalogOneItem';
import useCartItemsHook from "@/app/[lang]/components/Hooks/useCartItemsHook";

function Draggable({pages, setShowModal, item}: any) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState({index: 0, direction: true})
    const itemRefs = useRef<any>([])
    const observer = useRef<any>();
    const [windowInfo, setWindowInfo] = useState({width: 0, height: 0})
    const {cartItems} = useCartItemsHook()



    useEffect(() => {
        setWindowInfo({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect(() => {

        const handleIntersect = (entries: any) => {
            console.log({isDragging, entries: entries.filter((entry: any) => entry.isIntersecting)})
            entries.forEach((entry: any) => {
                console.log({entry,isIntersecting: entry.isIntersecting,intersectionRatio: entry.intersectionRatio})
                if (entry.isIntersecting) {
                    if (isDragging || isScrolling) {
                        console.log("intersecting", {
                            currentIndex,
                            length: pages.length
                        }, entry.target.dataset.index);
                        const newIndex = parseInt(entry.target.dataset.index)
                        setCurrentIndex(prevIndex => ({...prevIndex, index: newIndex}));
                    }
                }
            });
        }

        observer.current = new IntersectionObserver(handleIntersect, {
            root: containerRef.current,
            rootMargin: "0% -60% 0% 10%"
        });

        const items = itemRefs.current;
        items.forEach((item: any) => observer.current.observe(item));

        console.log("init obs")
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [currentIndex, isDragging, isScrolling, pages.length,containerRef.current]);

    useEffect(() => {
        if (pages.length > 0 && !isScrolling) {
            itemRefs.current[currentIndex.index].scrollIntoView({
                inline: "center",
                behavior: "smooth"
            })
        }
    }, [currentIndex, pages])



    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log("mouse down")

        setIsDragging(true);
        setDragStartX(event.clientX);
        setScrollLeft(containerRef.current!.scrollLeft);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || isScrolling) {
            // console.log("mouse moving ignored")

            return;
        }

        console.log("mouse moving")
        const dragDistance = event.clientX - dragStartX;
        containerRef.current!.scrollLeft = scrollLeft - dragDistance;
    };

    const handleMouseUp = () => {
        console.log("mouse up")
        setIsDragging(false);
    };



    // console.log({...currentIndex,pages});

    return (

        <>
            <PrevArrowCircle className={`arrow left`} onClick={() => {

                setCurrentIndex(prevIndex => ({
                    ...prevIndex,
                    direction: false,
                    index: (prevIndex.index + pages.length - 1) % pages.length
                }));

            }}/>
            <div
                ref={containerRef}
                className="draggable-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseUpCapture={handleMouseUp}

                onWheel={(event) => {
                    console.log("on Wheel",event.deltaY)

                    if (containerRef.current) {
                        containerRef.current.scrollLeft += event.deltaY;
                        setIsScrolling(true);

                        setTimeout(() => {
                            setIsScrolling(false);

                        }, 10)
                    }
                }}
            >

                <div className="counter">{currentIndex.index + 1}/{pages.length}</div>
                {
                    pages.length > 0 && pages.map((item: any, index: number) => (
                        <div key={`page-slider-${index}`} ref={(el) => itemRefs.current[index] = el} data-index={index}>
                            {item &&
                                <SingleItemPreview
                                    cartItems={cartItems}
                                    coordinates={item?.items.map((it: any) => ({
                                        ...it.coordinates,
                                        id: it._id,
                                        name: it.product_name
                                    })).flatMap((a: any) => a)}
                                    strokeImageUrl={item.page_image}
                                    height={(windowInfo.height - (16 * 7))}
                                    width={(item?.items[0]?.coordinates?.imageWidth ?? item?.dimensions.width) * (windowInfo.height - (16 * 7)) / (item?.items[0]?.coordinates?.imageHeight ?? item?.dimensions.height)}
                                    handleSelection={({itemId, itemName}) => {
                                        const selectedProduct = item?.items.find((it: { _id: string; }) => it._id === itemId)
                                        setShowModal({show: true, item: selectedProduct._id})
                                    }}
                                    imageHeight={item?.items[0]?.coordinates?.imageHeight ?? item?.dimensions.height}
                                    imageWidth={item?.items[0]?.coordinates?.imageWidth ?? item?.dimensions.width}

                                />
                            }
                        </div>
                    ))
                }

            </div>
            <NextArrowCircle className={`arrow right`} onClick={() => {
                setCurrentIndex(prevIndex => ({
                    ...prevIndex,
                    direction: true,
                    index: (prevIndex.index + 1) % pages.length
                }));
            }}/>
        </>
    );
}

export default Draggable