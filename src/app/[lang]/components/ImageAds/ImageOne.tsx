import Image from "next/image";
import banner1 from '../../../../../assets/home/bacola-banner-04.jpg'
import banner2 from '../../../../../assets/home/banner 1.jpg'
 

export const ImageOne = () => {
    return (
      <div className="mt-9 relative lg:mt-9 cursor-pointer">
        <Image
          src={banner1}
          alt="banner - Image"
          className="mb-0 h-[260px] w-full rounded-md lg:h-[403px] lg:w-[270px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center max-w-[390px] max-h-[290px] md:justify-center md:mt-14 md:max-w-[450px] lg:ml-7 lg:mt-0 px-8">
          <div className="flex flex-row  mt-3 lg:mt-6 items-center">
            <h1 className="text-white text-sm capitalize">
              best bakery products
            </h1>
          </div>
  
          <h2 className="text-black text-2xl mt-4 lg:text-2xl capitalize font-extralight lg:mt-1">
            Freshest Products
          </h2>
          <h1 className="text-black text-2xl mt-3 lg:mt-1 capitalize font-semibold">
            every hour.
          </h1>
          <h1 className="text-black text-xs mt-3 lg:mt-3">only-from</h1>
          <span className="text-red-600 font-semibold text-3xl lg:text-3xl">
            {" "}
            Rs 24.99{" "}
          </span>
          <div className="bg-cyan-500 py-2  flex flex-row rounded-full text-[13px] w-[100px] text-white font-bold px-4 justify-between mt-3 lg:mt-6">
            Shop Now
          </div>
        </div>
      </div>
    );
  };

  export const ImageTwo = () => {
    return (
      <div className="mt-9 relative lg:mt-9 cursor-pointer">
        <Image
          src={banner2}
          alt="banner - Image"
          className="mb-0 h-[260px] w-full rounded-md lg:h-[403px] lg:w-[270px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center max-w-[390px] max-h-[290px] md:justify-center md:mt-14 md:max-w-[450px] lg:ml-7 lg:mt-0 px-8">
          <div className="flex flex-row  mt-3 lg:mt-6 items-center">
            <h1 className="text-white text-sm capitalize">
              best bakery products
            </h1>
          </div>
  
          <h2 className="text-black text-2xl mt-4 lg:text-2xl capitalize font-extralight lg:mt-1">
            Freshest Products
          </h2>
          <h1 className="text-black text-2xl mt-3 lg:mt-1 capitalize font-semibold">
            every hour.
          </h1>
          <h1 className="text-black text-xs mt-3 lg:mt-3">only-from</h1>
          <span className="text-red-600 font-semibold text-3xl lg:text-3xl">
            {" "}
            Rs 24.99{" "}
          </span>
          <div className="bg-cyan-500 py-2  flex flex-row rounded-full text-[13px] w-[100px] text-white font-bold px-4 justify-between mt-3 lg:mt-6">
            Shop Now
          </div>
        </div>
      </div>
    );
  };