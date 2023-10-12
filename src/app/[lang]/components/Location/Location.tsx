"use client"
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { updateParamValue } from "../../../../../utils/baseUrl";
import { BiCurrentLocation } from "react-icons/bi";
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import PlaceResult = google.maps.places.PlaceResult;
import {AiFillCloseCircle} from "react-icons/ai";

interface LocationType {
    dollar_min: any;
    locationName: any;
    id: number;
    name: string;
    min: string;
}

export const Location = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [result, setResult] = useState<any>([])
    const [selectedLocation, setSelectedLocation] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const searchParams = useSearchParams()!
    const router = useRouter()
    const handleModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        console.log("eff sp")
        const lat = Number(searchParams.get("lat"))
        const long = Number(searchParams.get("long"))
        const delayDebounceFn = setInterval(() => {
            if (!isNaN(lat) && !isNaN(long) && window && window.google && google) {
                getAddressFromCoordinates(lat, long);
                clearInterval(delayDebounceFn)
            }
        }, 500)

        return () => clearInterval(delayDebounceFn)

    }, [searchParams])


    useEffect(() => {
        console.log("eff st")

        let delayDebounceFn: any
        if (searchTerm) {
            delayDebounceFn = setTimeout(() => {
                // Create a new AutocompleteService instance
                const autocompleteService = new google.maps.places.AutocompleteService();

                // Call the getPlacePredictions method
                autocompleteService.getPlacePredictions(
                    {
                        input: searchTerm,
                    },
                    (predictions: AutocompletePrediction[] | null, status: PlacesServiceStatus) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            // Process the predictions as needed
                            setResult(predictions);
                            console.log(predictions);
                        } else {
                            // Handle the API response error
                            console.error('Autocomplete API error:', status);
                        }
                    }
                );
            }, 500)
        }

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const createQueryString = useCallback(
        (name: string, value: any) => {
            const params = new URLSearchParams()
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    function handleSelectLocation(item: any) {
        console.log(item)
        const placeService = new google.maps.places.PlacesService(
            document.createElement("div")
        );
        console.log("placeService: ", placeService);

        placeService.getDetails(
            { placeId: item.place_id },
            (
                placeResult: PlaceResult | null,
                placeStatus: PlacesServiceStatus
            ) => {
                console.log("placeResult: ", placeResult);

                if (
                    placeStatus === google.maps.places.PlacesServiceStatus.OK &&
                    placeResult
                ) {
                    const lat = placeResult.geometry?.location?.lat();
                    const lng = placeResult.geometry?.location?.lng();
                    const formattedAddress = placeResult.formatted_address;
                    setSelectedLocation(formattedAddress!)
                    const addressComponents = placeResult.address_components;

                    // Find the component that represents the city or administrative area level 1
                    const cityComponent = addressComponents?.find(
                      (component) =>
                      component.types.includes('administrative_area_level_2') || component.types.includes('political')
                    );
                    
                    // Extract the city name from the cityComponent object
                    const cityName = cityComponent ? cityComponent.short_name : 'City not found';
                    console.log("Formatted Address: ", { formattedAddress, lat, lng , cityName});
                    // router.push(`/?${createQueryString("lat", lat ?? null)}&${createQueryString("long", lng ?? null)}`, {shallow: false})
                    const data = [
                        { key: 'lat', value: lat },
                        { key: 'long', value: lng },
                    ];
                    router.push(updateParamValue(data), { shallow: false })
                    setShowModal(false)

                }
            }
        );
    }

    function getAddressFromCoordinates(lat: number, lng: number): void {
        console.log("getAddressFromCoordinates", { lat, lng })
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latLng }, (results: any, status: any) => {
            if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results.length > 0
            ) {
                const formattedAddress = results[0].formatted_address;
                console.log("Formatted Address: ", formattedAddress, results);

                // Use the formatted address as needed
                setSelectedLocation(formattedAddress);
                setSearchTerm(formattedAddress)
            }
        });
    }

    function getMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                getAddressFromCoordinates(coords.latitude, coords.longitude)
                const data = [
                    { key: 'lat', value: coords.latitude },
                    { key: 'long', value: coords.longitude },
                ];
                router.push(updateParamValue(data), { shallow: false })
                // router.push(`/?${createQueryString("lat", String(coords.latitude))}&${createQueryString("long", String(coords.longitude))}`, {shallow: false})
            });
        }
    }


    return (
        <div className="w-full z-40">
            <div
                className="border rounded-l-md relative flex flex-row justify-start items-center h-[60px] w-full py-6 px-4 cursor-pointer bg-gray-50"
                onClick={handleModal}
            >
                <div className="flex flex-grow flex-col">
                    <div
                        className="truncate w-[150px] xl:w-[200px] 2xl:w-[300px] text-[13px] self-start font-semibold overflow-hidden whitespace-nowrap text-[#233a95] pr-4 break-words">
                        {selectedLocation ? selectedLocation : "Select a location....."}
                    </div>
                </div>
                <div className="flex-shrink flex justify-center items-center w-6 ">
                    <MdKeyboardArrowDown className="text-xl text-gray-400" />
                </div>
            </div>
            {showModal && (
                <div className="fixed z-40 inset-0 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[420px] sm:w-[420px] sm:p-6 relative w-[420px] h-[530px]">
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
                                        Search your pickup location
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
                                                className="bg-gray-100 border border-gray-100 rounded-md py-2 px-3 w-64 h-14 flex-1"
                                                value={searchTerm}
                                                onChange={(event) => {
                                                    setSearchTerm(event.target.value)
                                                }}
                                            />
                                            <div
                                                className=" text-gray-400 px-3 flex justify-center items-center cursor-pointer"
                                                onClick={() => {
                                                    setSearchTerm("")
                                                    setResult([])
                                                }}>
                                                <AiFillCloseCircle/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="location  mt-5"
                                    style={{ maxHeight: "300px", overflowY: "scroll" }}
                                >
                                    <div
                                        className="flex items-center justify-between px-2 py-4 bg-white text-gray-700 text-sm cursor-pointer"
                                        >
                                        <button className="hover:text-black hover:opacity-80 flex items-center gap-1 rounded-full border border-gray-200 px-2 h-9 bg-[#4285f4] text-white"
                                                onClick={() => getMyLocation()}>
                                            Get Current Location <BiCurrentLocation className="text-lg text-black"/>
                                        </button>

                                    </div>
                                    <hr />
                                    <>
                                        {result.map((item: any) => (
                                            <div
                                                key={item.place_id}
                                                onClick={() => handleSelectLocation(item)}>
                                                <div
                                                    className="flex items-center justify-between px-2 py-4 bg-white text-gray-700 text-sm cursor-pointer">
                                                    <div className="hover:text-[#233a95]">
                                                        {item.description}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        ))}</>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};