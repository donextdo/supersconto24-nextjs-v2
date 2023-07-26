import Link from "next/link";

const CitiesCard = ({ city }: any) => {
    return (
        <div>

            <div className="items-center w-40 h-10 gap-3 select-none lg:h-24 md:flex justify-left">
                <p className="font-semibold  text-lg text-primary hover:text-green-800  ">{city.city}
                </p>
            </div>
        </div>
    );
}

export default CitiesCard;