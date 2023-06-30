import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCurrency from "../Hooks/useCurrencyHook";

const CheckoutSidebar = ({ item, getPrice }: any) => {
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   console.log("item.subtotal : ", item);

  //   let discountprice;
  //   let newprice;
  //   if (item.discount) {
  //     discountprice = item.unit_price * (item.discount / 100);
  //     console.log("discountprice : ", discountprice);
  //     newprice = item.unit_price - discountprice;
  //   } else {
  //     newprice = item.unit_price;
  //     console.log("newprice : ", newprice);
  //   }
  //   let subtotal = item.count * newprice;
  //   console.log("subtotal : ", subtotal);
  //   setTotalPrice(subtotal);
  // }, [item]);

  // const MAX_LENGTH = 20; // Maximum number of characters to display

  // let displayName = item.title;
  // if (item.title.length > MAX_LENGTH) {
  //     displayName = item.title.substring(0, MAX_LENGTH) + '...';
  // }
  // console.log("item : ", item);

  return (
    <tr>
      <td className=" py-3 text-[13px] w-[50%]">
        {/* <Tooltip title={item.title} followCursor> */}

        <div>
          {item.product_name}{" "}
          <span className="font-semibold">× {item.count || 0}</span>
        </div>
        {/* </Tooltip> */}
      </td>
      {item.discount > 0 ? (
        <td className=" py-3 text-[15px] text-right">
            {/*{((item.unit_price - (item.unit_price / 100) * item.discount) *item.count)}*/}
          {getPrice((item.unit_price - (item.unit_price / 100) * item.discount) *item.count)}
        </td>
      ) : (
        <td className=" py-3 text-[15px] text-right">
          {getPrice(item.unit_price * item.count)}
        </td>
      )}
    </tr>
  );
};

export default CheckoutSidebar;
