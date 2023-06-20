//import icons
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { CiDollar } from "react-icons/ci";

import MainFooter from "./Footer-middle";

export default function Footer() {
  return (
    <div className="container mx-auto xl:px-40 px-5">
      {/* <div className="bg-[#f7f8fd] w-[100%] h-1/2">
        <div className="container justify-center pt-10 mx-auto xl:py-10 xl:flex">

          <div className="px-3 border-t-0 border-b-0 border-l-0 border-r-2 xl:px-3">

            <div className="flex ">
              <p className="xl:mx-2 text-[24px]">
                <MdProductionQuantityLimits />
              </p>
              <p className="text-[13px] font-medium pl-2 ">
                Everyday fresh products
              </p>
            </div>
          </div>
          <div className="px-1 border border-t-0 border-b-0 border-l-0 border-r-2 xl:px-3">
            <div className="flex ">
              <p className="mx-2 text-[24px]">
                <TbTruckDelivery />
              </p>
              <p className="text-[13px] font-medium">
                In-store pickup
              </p>
            </div>
          </div>
          <div className="px-1 border border-t-0 border-b-0 border-l-0 border-r-2 xl:px-3">
            <div className="flex ">
              <p className="mx-2 text-[24px]">
                <TbDiscount2 />
              </p>
              <p className="text-[13px] font-medium">Daily Mega Discounts</p>
            </div>
          </div>
          <div>
            <div className="flex px-1 xl:px-3">
              <p className="mx-2 text-[24px]">
                <CiDollar />
              </p>
              <p className="text-[13px] font-medium">
                Best price on the market
              </p>
            </div>
          </div>
        </div>
        <hr className="xl:mx-16" />
      </div> */}
      <MainFooter />
    </div>
  );
}
