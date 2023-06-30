'use client'
import Image from "next/image"
import {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import Link from "next/link"
import {SlHandbag} from "react-icons/sl"
import {FaAngleLeft} from "react-icons/fa"
import nextArrow from '../../../../../public/arrow-next.svg'
import prevArrow from '../../../../../public/arrow-prev.svg'
import Draggable from "../Draggable/Draggable"
import AddToCartModal from "../../features/cart/AddCartModal"
import ProductPopup from "../../features/product/ProductPopup"
import CartPopup from "@/app/[lang]/features/cart/popup-cart/CartPopup";
import logo from "../../../../../assets/logo/logo.png";


interface Props {
    catalog?: any
    params?: {
        catalogId: string;
    };
}

const CatalogCarousel: React.FC<Props> = ({catalog, params}) => {

    console.log(params)
    const [pages, setPages] = useState([])
    const [showModal, setShowModal] = useState({show: false, item: null})
    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <NextArrowCircle/>,
        prevArrow: <PrevArrowCircle/>,
    })
    const [windowInfo, setWindowInfo] = useState({width: 0, height: 0})
    const [showCart, setShowCart] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [changecolor, setChangecolor] = useState(false)
    const [cart, setCart] = useState(false);
    const totalCount = useSelector((state: RootState) => state.cart.totalCount);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    localStorage.setItem('totalCount', totalCount.toString());
  }, [totalCount]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem('cartItems');
    const cartItemsArray = cartItemsString ? JSON.parse(cartItemsString) : [];
    if (cartItemsArray.length > 0){
      const sum = cartItemsArray.reduce((accumulator:any, currentValue:any) => {
        const updatedUnitPrice = currentValue.unit_price - (currentValue.unit_price * (currentValue.discount / 100));
        return accumulator + (currentValue.count * updatedUnitPrice);
      }, 0);

      const sumQuantity = cartItemsArray.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.count, 0);
      setTotalPrice(sum)
      setTotalQuantity(sumQuantity)
      
    }
    
    
    console.log("head total",totalAmount)
  },[totalAmount]);




    useEffect(() => {
        console.log(catalog);
        if (catalog) {
            setPages(catalog.pages)
            if (catalog.pages.length === 1) {
                setSettings(prevState => ({
                    ...prevState, slidesToScroll: 1,
                    slidesToShow: 1
                }))
            }
        }
    }, [catalog])

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowCart(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    //   const getItemCount = () => {
    //     let count = 0
    //     let totol = 0
    //   if (cartObj) {
    //       Object.keys(cartObj).forEach(shop => {
    //           count += cartObj[shop].length
    //           cartObj[shop].forEach((item: { cartQuantity: number; }) => {
    //               totol += item.cartQuantity
    //           })
    //       })
    //   }
    //   return `${count} (${totol})`
    // }

    const formattedDate = new Date(catalog.expiredate).toLocaleDateString("en-GB")

    const handleCart = () => {
        setShowCart(!showCart)
    }

    console.log(windowInfo)

    const handleClick = () => {
        // setCart(!cart)
    };
    const hnadleEnter = () => {
        setCart(true);
    };
    const handleLeave = () => {
        setCart(false);
    };

    console.log("qqq", catalog)
    return (
        <div className="catalog-page">
            <div className="catalog-header">
                <div className='flex justify-between mx-2 items-center py-4'>
                    <div className='ml-12 '>
                        <Link href="/">
                            <Image src={logo} alt="LOGO" className='h-11 sm:h-9 md:h-11 w-auto'/>
                        </Link>
                    </div>
                    <div className='text-center'>
                        <p className="font-semibold">{catalog.title}</p>
                        <p className="text-sm">Expire Date - {formattedDate}</p>
                    </div>
                    <div
                        className="relative mr-2"
                        onMouseEnter={hnadleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <button
                            className="border border-[#fff1ee] bg-[#fff1ee] rounded-full p-2"
                            onClick={handleClick}
                        >
                            <SlHandbag className="text-2xl text-[#ea2b0f]"/>
                        </button>

                        {cart && <CartPopup setCart={setCart}/>}
                        {totalQuantity > 0 && (
                            <div
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                {totalQuantity}
                            </div>
                        )}
                    </div>

                    {/*{showCart &&*/}
                    {/*    <NavbarCartModal ref={ref} />*/}
                    {/*}*/}

                </div>
            </div>
            <div className="catalog-component">

                {/* <Link href="/" className='fixed left-2 top-4'>
                    <button className="text-4xl  z-50 bg-[#8DC14F] rounded-full "><FaAngleLeft className='text-white' />
                    </button>
                </Link> */}
                {/*<Slider {...settings}>
                {
                    pages.length > 0 && pages.map((item: any, index) => (
                        <div key={`page-slider-${index}`}>
                            {item.items && item.items.length > 0 &&
                                <SingleItemPreview
                                    coordinates={item.items.map((it: any) => ({
                                        ...it.coordinates,
                                        id: it._id,
                                        name: it.product_name
                                    })).flatMap((a: any) => a)}
                                    strokeImageUrl={item.page_image}
                                    height={item?.items[0]?.coordinates?.imageHeight * 1.2}
                                    width={item?.items[0]?.coordinates?.imageWidth *  1.2 }
                                    handleSelection={({itemId, itemName}) => {
                                        const selectedProduct = item.items.find((it: { _id: string; }) => it._id === itemId)
                                        setShowModal({show: true, item: selectedProduct})
                                    }}
                                    imageHeight={item?.items[0]?.coordinates?.imageHeight}
                                    imageWidth={item?.items[0]?.coordinates?.imageWidth}
                                />
                            }
                        </div>
                    ))
                }
            </Slider>*/}
                <Draggable pages={pages} setShowModal={setShowModal} changecolor={changecolor}/>

                {showModal.show && showModal.item &&
                    <ProductPopup proId={showModal.item} setChangecolor={setChangecolor}
                                  setProductPopup={() => setShowModal(prevState => ({
                                      ...prevState,
                                      show: false
                                  }))}/>}

            </div>
        </div>
    );
}

export default CatalogCarousel;

// export const getServerSideProps = async (context: any) => {
//     console.log("aaa",context.query.catalogId)
//     const catalog = await Promise.all([
//         fetch(requests.findCatalogById(context.query.catalogId)).then((res) => res.json())
//     ])

//     console.log(catalog)

//     return {
//         props: {
//             catalog: catalog
//         }
//     }

// }

export function NextArrowCircle({className, style, onClick}: any) {
    return (
        <div
            className={`${className}`}
            style={style}
            onClick={onClick}
            draggable={false}
        >
            <Image fill src={nextArrow} alt={""}/>
        </div>
    );
}

export function PrevArrowCircle({className, style, onClick}: any) {
    return (
        <div
            className={`${className}`}
            style={style}
            onClick={onClick}
            draggable={false}
        >
            <Image fill src={prevArrow} alt={""}/>
        </div>
    );
}