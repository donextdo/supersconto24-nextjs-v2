import Image from "next/image";
import Link from "next/link";
import pic from "../../../../assets/item/item2.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/[lang]/redux/store";
import { OrderItem } from "@/app/[lang]/components/Checkout/orderItem";
import { getOrdersByUserIdAsync } from "@/app/[lang]/components/Checkout/orderSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import baseUrl from "../../../../../../utils/baseUrl";

interface Order {
  orderId: string;
  orderNumber: string;
  userId: string;
  totalprice: number;
  date: string;
  status: string;
  address:string;
  payment:string;
  items: {
    productDetails: {
      name: string;
      price: number;
      brand: string;
      description: string;
      front: string;
    };
    orderquantity: number;

    productId: number;
  }[];
  billingAddress: {
    billingFirstName: string;
    billingLastName: string;
    billingCompanyName: string;
    country: string;
    street: string;
    apartment: string;
    town: string;
    state: string;
    zipCode: string;
    billingPhone: string;
    billingEmail: string;
    note: string;
  };
  shippingAddress: {
    shippingFirstName: string;
    shippingLastName: string;
    shippingCompanyName: string;
    country: string;
    street: string;
    apartment: string;
    town: string;
    state: string;
    zipCode: string;
    shippingPhone: string;
    shippingEmail: string;
  };
}

const Orders = () => {
  const [order, setOrder] = useState<Order>({
    orderId: "",
    orderNumber: "",
    userId: "",
    totalprice: 0,
    date: "",
    status: "",
    payment:"",
    address: "",
    items: [
      {
        productId: 0,
        orderquantity: 1,
        productDetails: {
          name: "",
          brand: "",
          description: "",
          price: 0,
          front: "",
        },
      },
    ],
    billingAddress: {
      apartment: "",
      country: "",
      billingCompanyName: "",
      billingEmail: "",
      billingFirstName: "",
      billingLastName: "",
      billingPhone: "",
      state: "",
      street: "",
      town: "",
      zipCode: "",
      note: "",
    },
    shippingAddress: {
      apartment: "",
      country: "",
      shippingCompanyName: "",
      shippingEmail: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingPhone: "",
      state: "",
      street: "",
      town: "",
      zipCode: "",
    },
  });
  const [hideOrder, setHideOrder] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const orderList = useSelector((state: RootState) => state.order.orders);
  console.log(orderList);
  

  let id: string | null;
  if (localStorage.getItem("id") !== null) {
    id = localStorage.getItem("id");
  } else {
  }

  useEffect(() => {
    dispatch(getOrdersByUserIdAsync(id!));
  }, [dispatch, id!]);

  const handleView = async (orderId: any) => {
    setHideOrder(false);
    try {
      const res = await axios.get(`${baseUrl}/orders/${orderId}`);
      console.log(res.data);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="border border-gray-200 p-4 ">
    //     <p className="leading-loose"><Link href="#" className="bg-[#233a95] text-white p-2 rounded-md">Browse Products</Link> No Order has been made yet.</p>
    // </div>
    <div>
      {hideOrder ? (
        <div>
          {orderList.length > 0 ? (
            <div className="">
              {orderList.map((order) => (
                <div className="mb-8" key={order.orderId}>
                  <div className="border border-gray-200 p-5 grid grid-cols-5">
                    <div>
                      <h1 className="text-sm font-semibold">Order</h1>
                      <p className="text-[13px] text-[#2bbef9]">
                        #{order.orderNumber}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold">Date</h1>
                      <p className="text-[13px]">{order.date}</p>
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold">Status</h1>
                      <p className="text-[13px]">{order.status}</p>
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold">Total</h1>
                      <p className="text-[13px]">
                        Rs {order.totalprice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <button
                        className="bg-[#233a95] text-white p-2 rounded-md w-[74px]"
                        onClick={() => handleView(order.orderId)}
                      >
                        view
                      </button>
                    </div>
                  </div>
                  {order.items.map((item) => (
                    <div
                      className="border border-gray-200 p-5 space-y-3"
                      key={item.productId}
                    >
                      <div className="flex justify-between border border-gray-200 items-center px-5 py-[15px]">
                        <p className="text-sm">
                          {item.productDetails?.name}{" "}
                          <span className="text-sm font-semibold">
                            x {item.orderquantity}
                          </span>{" "}
                        </p>
                        <div className="h-[60px] w-[60px] ">
                          <img
                            src={item.productDetails?.front}
                            alt="item1"
                            style={{
                              objectFit: "contain",
                              backgroundColor: "white",
                              width: "100%",
                              height: "100%",
                            }}
                            width={450}
                            height={400}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 p-4 ">
              <p className="leading-loose">
                <Link
                  href="/shop"
                  className="bg-[#233a95] text-white p-2 rounded-md"
                >
                  Browse Products
                </Link>{" "}
                No Order has been made yet.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 mx-8">
          {/* <MyAccount /> */}
          <h2 className="text-sm">
            Order #<span className="bg-[#fcf8e3]">{order.orderNumber}</span> was
            placed on <span className="bg-[#fcf8e3]">{order?.date}</span> and is
            currently <span className="bg-[#fcf8e3]"> On hold</span>.
          </h2>

          <div className="mt-2">
            <h2 className="font-semibold  mt-4 mb-2">ORDER DETAILS</h2>
            <hr />
            <div className="mb-4 mt-4 w-full">
              <div className="flex ">
                <div className="w-2/3 text-sm px-2 py-2 font-semibold border border-gray-300 ">
                  Product
                </div>
                <div className="w-1/3 text-sm px-2 py-2 font-semibold border border-gray-300 ">
                  Total
                </div>
              </div>
              {order?.items.map((item, index) => (
                <div className="flex  " key={index}>
                  <div className="w-2/3 text-sm px-2 py-2 border border-gray-300 ">
                    {item.productDetails?.name}{" "}
                    <span className="text-sm font-semibold">
                      x {item.orderquantity}
                    </span>
                  </div>
                  <div className="w-1/3 text-sm px-2 py-2 border border-gray-300 ">
                    Rs {item.productDetails?.price}
                  </div>
                </div>
              ))}
              <div className="flex  ">
                <div className="w-2/3 font-semibold text-sm px-2 py-2 border border-gray-300 ">
                  Location
                </div>
                <div className="w-1/3 text-sm px-2 py-2 border border-gray-300 ">
                  {order?.address}
                </div>
              </div>
              <div className="flex  ">
                <div className="w-2/3 font-semibold text-sm px-2 py-2 border border-gray-300 ">
                  Subtotal:
                </div>
                <div className="w-1/3 text-sm px-2 py-2 border border-gray-300 ">
                  Rs {order?.totalprice.toFixed(2)}
                </div>
              </div>
              <div className="flex  ">
                <div className="w-2/3 font-semibold text-sm px-2 py-2 border border-gray-300 ">
                  Payment method:
                </div>
                <div className="w-1/3 text-sm px-2 py-2 border border-gray-300 ">
                {order?.payment}
                </div>
              </div>
              <div className="flex  ">
                <div className="w-2/3 font-semibold text-sm px-2 py-2 border border-gray-300 ">
                  Total:
                </div>
                <div className="w-1/3 text-sm px-2 py-2 border border-gray-300 ">
                  Rs {order?.totalprice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt -2">
              <div>
                <h2 className="font-semibold  mb-2">BILLING ADDRESS</h2>
                <hr />
                <div className="mb-4 mt-4">
                  <h2 className="text-sm">
                    {order?.billingAddress.billingFirstName}{" "}
                    {order?.billingAddress.billingLastName}
                  </h2>
                  <h2 className="text-sm">
                    {order?.billingAddress.billingCompanyName}
                  </h2>
                  <h2 className="text-sm">{order?.billingAddress.street}</h2>
                  <h2 className="text-sm">{order?.billingAddress.town}</h2>
                  <h2 className="text-sm">{order?.billingAddress.zipCode}</h2>
                  <h2 className="text-sm">{order?.billingAddress.country}</h2>
                  <h2 className="text-sm">
                    {order?.billingAddress.billingPhone}
                  </h2>
                  <h2 className="text-sm mt-2">
                    {order?.billingAddress.billingEmail}
                  </h2>
                </div>
              </div>
              <div>
                <h2 className="font-semibold mb-2">SHIPPING ADDRESS</h2>
                <hr />
                <div className="mb-4 mt-4">
                  <h2 className="text-sm">
                    {order?.shippingAddress.shippingFirstName}{" "}
                    {order?.shippingAddress.shippingLastName}
                  </h2>
                  <h2 className="text-sm">
                    {order?.shippingAddress.shippingCompanyName}
                  </h2>
                  <h2 className="text-sm">{order?.shippingAddress.street}</h2>
                  <h2 className="text-sm">{order?.shippingAddress.town}</h2>
                  <h2 className="text-sm">{order?.shippingAddress.zipCode}</h2>
                  <h2 className="text-sm">{order?.shippingAddress.country}</h2>
                  <h2 className="text-sm">
                    {order?.shippingAddress.shippingPhone}
                  </h2>
                  <h2 className="text-sm mt-2">
                    {order?.shippingAddress.shippingEmail}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
