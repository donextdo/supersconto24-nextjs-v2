import Image from "next/image";

const MoreCategoriesCard = ({category}:any) => {
    return ( 
        <div className="flex flex-col justify-center items-center space-y-4 border h-52 p-10">
              <div className="h-28 w-full rounded-md ">
                <Image
                    src={category.image}
                    alt="item1"
                    className="object-contain w-full h-full rounded-md"
                    width={450}
                    height={400}
                />
            </div>
            <h1 className="font-bold text-xs">{category.name}</h1>
        </div>
     );
}
 
export default MoreCategoriesCard;