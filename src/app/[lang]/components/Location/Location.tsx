"use client"
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
import {FiSearch} from "react-icons/fi";
import {useRouter, useSearchParams} from "next/navigation";
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import PlaceResult = google.maps.places.PlaceResult;

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
        const lat = Number(searchParams.get("lat"))
        const long = Number(searchParams.get("long"))
        const delayDebounceFn = setInterval(() => {
            if (!isNaN(lat) && !isNaN(long) && google) {
                getAddressFromCoordinates(lat, long);
                clearInterval(delayDebounceFn)
            }
        }, 500)

        return () => clearInterval(delayDebounceFn)

    }, [searchParams])


    useEffect(() => {

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
                    (predictions: AutocompletePrediction[] | null , status: PlacesServiceStatus ) => {
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
            {placeId: item.place_id},
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

                    console.log("Formatted Address: ", {formattedAddress, lat, lng});
                    router.push(`/?${createQueryString("lat", lat ?? null)}&${createQueryString("long", lng ?? null)}`, {shallow: false})
                    setShowModal(false)

                }
            }
        );
    }

    function getAddressFromCoordinates(lat: number, lng: number): void {
        console.log("getAddressFromCoordinates", {lat, lng})
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({location: latLng}, (results: any, status: any) => {
            if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results.length > 0
            ) {
                const formattedAddress = results[0].formatted_address;
                console.log("Formatted Address: ", formattedAddress, results);

                // Use the formatted address as needed
                setSelectedLocation(formattedAddress);
            }
        });
    }

    function getMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                getAddressFromCoordinates(coords.latitude, coords.longitude)
                router.push(`/?${createQueryString("lat", String(coords.latitude))}&${createQueryString("long", String(coords.longitude))}`, {shallow: false})
            });
        }
    }


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
                    <div
                        className="truncate w-[130px] text-[0.8125rem] self-start font-semibold overflow-hidden whitespace-nowrap text-[#233a95] pr-4">
                        {selectedLocation ?? "Select a location"}
                    </div>
                </div>
                <div className="flex-shrink flex justify-center items-center w-6 ">
                    <MdKeyboardArrowDown className="text-xl text-gray-400"/>
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
                                                value={searchTerm}
                                                onChange={(event) => {
                                                    setSearchTerm(event.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="location  mt-5"
                                    style={{maxHeight: "300px", overflowY: "scroll"}}
                                >
                                    <div
                                        className="flex items-center justify-between px-2 py-4 bg-white text-gray-700 text-sm cursor-pointer"
                                        onClick={() => getMyLocation()}>
                                        <div className="hover:text-[#233a95]">
                                            Get Current Location
                                        </div>
                                        <div
                                            className="rounded-full text-gray-400 font-semibold w-20 px-2 text-xs h-8 border border-gray-200 flex justify-center items-center"
                                            onClick={() => {
                                                setSearchTerm("")
                                                setResult([])
                                            }}>
                                            Clear All
                                        </div>
                                    </div>
                                    <hr/>
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
                                                <hr/>
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