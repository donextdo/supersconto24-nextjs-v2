import Image from "next/image";
import pic1 from '../../../../assets/about/about-header.jpg'
import pic2 from '../../../../assets/about/about-people.jpg'


function About() {
  return (
    <>
      {/* Header Section */}
      <div className="relative text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="w-full h-1/2">
          <Image
            src={pic1}
            alt="Header Image"
            className="w-full "
            width={1200}
            height={800}
          />
        </div>
        <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <p className="text-[23px] font-semibold md:text-[32px] lg:text-6xl sm:mt-3">
            About for Supersconto24
          </p>
          <p className="font-semibold lg:tracking-[.25em] md:text-[12px] lg:text-sm lg:mt-3 text-[12px]">
            WE CAN DO MORE FOR YOU
          </p>
        </div>
      </div>
      {/* Section-1 */}
      <div className="mx-5 xl:mx-24 md:mx-16 lg:mx-5">
        <div className="">
          <div className="mt-10 text-sm md:text-base">
            <p className=" text-gray-600 text-[14px]">
              In nec purus eget neque accumsan finibus. Duis condimentum elit ut
              libero commodo iaculis. Donec augue diam, tristique et ultricies
              nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus
              id lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum
              metus in dapibus. Vestibulum sit amet sollicitudin enim. Ut id
              interdum turpis. Curabitur porta auctor quam, pretium facilisis
              nisl. Pellentesque efficitur elit ante, vel vulputate tortor
              blandit nec.
            </p>
          </div>
        </div>

        {/* Section-2 */}
        <div className="">
          <div className="xl:px-10">
            <div className="">
              <p className="xl:pl-5 xl:pr-80 lg:pr-80 mt-5 text-[28px] 2xl:text-[32px] md:text-[32px] font-semibold text-gray-900  ">
                Quisque erat urna, congue et libero in eleifend euismod velit.
              </p>
            </div>

            <div>
              <p className="xl:p-5 my-7  text-gray-600 text-[14px] ">
                In nec purus eget neque accumsan finibus. Duis condimentum elit
                ut libero commodo iaculis. Donec augue diam, tristique et
                ultricies nec, consectetur quis enim. Nullam id rutrum ex.
                Aliquam a lectus id lacus rhoncus dapibus non ac justo. Vivamus
                lacinia vestibulum metus in dapibus. Vestibulum sit amet
                sollicitudin enim. Ut id interdum turpis. Curabitur porta auctor
                quam, pretium facilisis nisl. Pellentesque efficitur elit ante,
                vel vulputate tortor blandit nec.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:grid-flow-col xl:grid xl:grid-col-2">
          {/* <div className="relative ">
            <Image
              src={pic2}
              alt="Bacola-Ceo"
              className="w-full h-full mb-5 xl:w-full lg:w-3/4"
              width={1200}
              height={800}
            />
          </div> */}

          <div className="xl:ml-16 xl:mt-24 xl:mb-40">
            <p className=" text-gray-900 text-[16px]  text-left ">
              Rachel Leonard - Supersconto24 CEO
            </p>
            <p className="  mt-5 text-[28px] font-semibold  gray-900 2xl:text-[32px] xl:text-[32px]">
              Duis convallis luctus pretium. Pellentesque habitant morbi
            </p>
            <p className=" mt-5  text-gray-600 text-[14px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p className="  mt-5 text-gray-600 text-[14px]">
              In fermentum mi ut sapien semper, a sagittis lorem vulputate.
              Integer gravida, dui eget aliquet tempus, turpis orci vehicula
              ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar
              lacus, ac volutpat neque. Ut at magna id justo bibendum lobortis.
              Integer tortor nulla, ultricies et nisi sit amet, interdum dictum
              felis. In semper laoreet dui vitae pharetra. Etiam sit amet
              molestie nulla, eu efficitur orci. Praesent rutrum ante justo,
              eget malesuada ante ornare ac. Ut dignissim blandit urna, eget
              euismod leo rhoncus nec. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae; Quisque lobortis
              libero ante. Nullam in feugiat erat. Aenean sed justo dapibus,
              sodales nisi ut, fringilla lorem. Vestibulum in orci ac nisl
              condimentum fermentum at et sem. Curabitur fermentum dolor eu
              lacus consectetur varius.
            </p>
          </div>
        </div>

        <div className="xl:mx-16  text-[14px] xl:mt-40 mt-5 xl:mr-10  xl:absolute xl:pl-16  xl:py-10 text-gray-600  xl:-translate-y-[160%] 2xl:-translate-y-[190%]  xl:bg-white  xl:rounded-md    ">
          <p className="xl:px-10">
            In nec purus eget neque accumsan finibus. Duis condimentum elit ut
            libero commodo iaculis. Donec augue diam, tristique et ultricies
            nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id
            lacus rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus
            in dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum
            turpis. Curabitur porta auctor quam, pretium facilisis nisl.
            Pellentesque efficitur elit ante, vel vulputate tortor blandit nec.
          </p>
        </div>

        <div className="container mb-10 xl:mt-32 2xl:mt-16">
          <div className="mt-5  text-[14px]">
            <p className="mt-3 text-gray-600">
              In fermentum mi ut sapien semper, a sagittis lorem vulputate.
              Integer gravida, dui eget aliquet tempus, turpis orci vehicula
              ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar
              lacus, ac volutpat neque. Ut at magna id justo bibendum lobortis.
              Integer tortor nulla, ultricies et nisi sit amet, interdum dictum
              felis. In semper laoreet dui vitae pharetra. Etiam sit amet
              molestie nulla, eu efficitur orci. Praesent rutrum ante justo,
              eget malesuada ante ornare ac. Ut dignissim blandit urna, eget
              euismod leo rhoncus nec. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae; Quisque lobortis
              libero ante. Nullam in feugiat erat. Aenean sed justo dapibus,
              sodales nisi ut, fringilla lorem. Vestibulum in orci ac nisl
              condimentum fermentum at et sem. Curabitur fermentum dolor eu
              lacus consectetur varius.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
