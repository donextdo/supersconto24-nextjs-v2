import Link from "next/link";

const CitiesCard = ({ city }: any) => {
    // console.log(city)
    return (
        <div>
            <div className="w-60 font-semibold text-lg text-primary hover:text-green-800 truncate">
                {city}
            </div>
        </div>
    );
}

export default CitiesCard;