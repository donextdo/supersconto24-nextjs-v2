import Image from "next/image";

const ShopsCard = ({ shop }: any) => {
    return (
        <div>
            <div className="w-[12.5rem] h-24  overflow-hidden">
                <Image
                    src={shop.logo_img}
                    alt={shop.shop_name}
                    className="object-cover w-full h-full"
                    width={450}
                    height={400}
                />
            </div>
        </div>
    );
}

export default ShopsCard;