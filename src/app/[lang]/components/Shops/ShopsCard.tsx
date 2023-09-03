import Image from "next/image";

const ShopsCard = ({ shop }: any) => {
    return (
        <div>
            <div className="w-[12.5rem] h-24  overflow-hidden">
                <img
                    src={shop.logo_img}
                    alt={shop.shop_name}
                    className="object-contain w-full h-full "
                />
            </div>
        </div>
    );
}

export default ShopsCard;