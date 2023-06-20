import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import baseUrl from "../../../../../utils/baseUrl";

interface LocationType {
  dollar_min: any;
  locationName: any;
  id: number;
  name: string;
  min: string;
}

export const Location = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [location, setLocation] = useState<LocationType[]>([]);

  const [locationName, setLocationName] = useState<string>("Select a Location");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredLocation = location.filter((item) =>
    item.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(`${baseUrl}/locations/getAll`);

      // const locations = response.data;

      // setLocation(locations);
      // console.log("location", locations);
    };
    fetchData();
    setLocationName(locationName);
  }, [locationName]);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleSelectLocation = (location: any) => {
    localStorage.clear();
    setLocationName(location.locationName);
    setShowModal(false);
    localStorage.setItem("selectedLocation", location.locationName);
  };
  const getInitialLocation = () => {
    const selectedLocation = localStorage.getItem("selectedLocation");
    if (selectedLocation) {
      setLocationName(selectedLocation);
    }
  };

  const handleClearLocation = () => {
    localStorage.clear();
    const name = "Select a Location";
    setLocationName(name);
    setShowModal(false);
    localStorage.setItem("selectedLocation", name);
  };

  const getClearLocation = () => {
    const selectedLocationString = localStorage.getItem("selectedLocation");
    if (selectedLocationString) {
      setLocationName(selectedLocationString);
    } else {
      setLocationName("Select a Location");
    }
  };

  useEffect(() => {
    getInitialLocation();
    getClearLocation();
  }, []);
  return (
    <div className=" z-40">
      <div
        className="border border-gray-200 rounded-md relative mx-6 flex flex-row justify-start items-center h-[60px] w-[180px] py-6 px-4 shadow-sm cursor-pointer md:mx-3 "
        onClick={handleModal}
      >
        <div className="flex-grow flex flex-col">
          <div className="text-[0.625rem] opacity-50 self-start ">
            Your Location
          </div>
          <div className="text-[0.8125rem] self-start font-semibold overflow-hidden whitespace-nowrap text-[#233a95] pr-4">
            {locationName}
          </div>
        </div>
        <div className="flex-shrink flex justify-center items-center w-6 ">
          <MdKeyboardArrowDown className="text-xl text-gray-400" />
        </div>
      </div>
      {showModal && (
        <div className="fixed z-40 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[420px] sm:w-[420px] sm:p-6 relative w-[420px] h-[530px]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <div className="mt-3  sm:mt-5 ">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Choose your pickup location
                  </h3>
                  <h2 className="text-xs leading-6 text-gray-500">
                    Enter your address and we will specify the offer for your
                    area.
                  </h2>
                  <div className="mt-2  h-14">
                    <div className="text-sm bg-gray-100 flex items-center h-14">
                      <FiSearch
                        type="submit"
                        className="min-h-[36px] min-w-[24px] text-gray-600 h-14 ml-3"
                      />
                      <input
                        type="text"
                        placeholder="Search your area"
                        className="bg-gray-100 border border-gray-100 rounded-md py-2 px-3 w-64 h-14"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="location  mt-5"
                  style={{ maxHeight: "300px", overflowY: "scroll" }}
                >
                  <div
                    className="flex items-center justify-between px-2 py-4 bg-white text-gray-700 text-sm cursor-pointer"
                    onClick={() => handleClearLocation()}
                  >
                    <div className="hover:text-[#233a95]">
                      Select a Location
                    </div>
                    <div className="rounded-full text-gray-400 font-semibold w-20 px-2 text-xs h-8 border border-gray-200 flex justify-center items-center">
                      Clear All
                    </div>
                  </div>
                  <hr />
                  {filteredLocation.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectLocation(item)}
                    >
                      <div className="flex items-center justify-between px-2 py-4 bg-white text-gray-700 text-sm cursor-pointer">
                        <div className="hover:text-[#233a95]">
                          {item.locationName}
                        </div>
                        {/* <div className="rounded-full text-gray-400 font-semibold w-20 px-2 text-xs h-8 border border-gray-200 flex justify-center items-center">
                          Rs:{item.dollar_min}
                        </div> */}
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
