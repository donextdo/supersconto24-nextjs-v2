import React, {useState, useRef, useEffect, useCallback} from 'react';
import {log} from "util";
import SingleItemPreview from '../Catalog/SingleItemPreview';
import { NextArrowCircle, PrevArrowCircle } from '../CatalogOneItem/CatalogOneItem';

function Draggable({pages, setShowModal, changecolor, item}: any) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState({index: 0, direction: true})
    const itemRefs = useRef<any>([])
    const observer = useRef<any>();
    const [windowInfo, setWindowInfo] = useState({width: 0, height: 0})


    useEffect(() => {
        setWindowInfo({width: window.innerWidth, height: window.innerHeight})

    }, [])

    useEffect(() => {
        observer.current = new IntersectionObserver(handleIntersect, {
            threshold: 1,
        });
        const items = itemRefs.current;
        items.forEach((item: any) => observer.current.observe(item));
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [pages, currentIndex, isDragging]);

    useEffect(() => {
        if (pages.length > 0) {
            itemRefs.current[currentIndex.index].scrollIntoView({
                inline: "center",
                behavior: "smooth"
            })
        }
    }, [currentIndex, pages])

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStartX(event.clientX);
        setScrollLeft(containerRef.current!.scrollLeft);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) {
            return;
        }

        const dragDistance = event.clientX - dragStartX;
        containerRef.current!.scrollLeft = scrollLeft - dragDistance;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleIntersect = (entries: any) => {
        console.log(entries)
        entries.forEach((entry: any) => {
            if (entry.isIntersecting && entry.intersectionRatio === 1) {
                if (isDragging) {
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

    console.log({...currentIndex,pages});


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
            >

                <div className="counter">{currentIndex.index + 1}/{pages.length}</div>
                {
                    pages.length > 0 && pages.map((item: any, index: number) => (
                        <div key={`page-slider-${index}`} ref={(el) => itemRefs.current[index] = el} data-index={index}>
                            {item.items && item.items.length > 0 &&
                                <SingleItemPreview
                                    coordinates={item.items.map((it: any) => ({
                                        ...it.coordinates,
                                        id: it._id,
                                        name: it.product_name
                                    })).flatMap((a: any) => a)}
                                    strokeImageUrl={item.page_image}
                                    height={(windowInfo.height - (16 * 7))}
                                    width={item?.items[0]?.coordinates?.imageWidth * (windowInfo.height - (16 * 7)) / item?.items[0]?.coordinates?.imageHeight}
                                    handleSelection={({itemId, itemName}) => {
                                        const selectedProduct = item.items.find((it: { _id: string; }) => it._id === itemId)
                                        setShowModal({show: true, item: selectedProduct._id})
                                    }}
                                    imageHeight={item?.items[0]?.coordinates?.imageHeight}
                                    imageWidth={item?.items[0]?.coordinates?.imageWidth}
                                    changecolor={changecolor}
                                    
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