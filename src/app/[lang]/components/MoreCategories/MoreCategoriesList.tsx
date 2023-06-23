import cat1 from '../../../../../assets/categories/Vector1.png'
import cat2 from '../../../../../assets/categories/Vector2.png'
import cat3 from '../../../../../assets/categories/Vector3.png'
import cat4 from '../../../../../assets/categories/Vector4.png'
import cat5 from '../../../../../assets/categories/Vector5.png'
import cat6 from '../../../../../assets/categories/Vector6.png'
import cat7 from '../../../../../assets/categories/Vector7.png'
import cat8 from '../../../../../assets/categories/Vector.png'
import cat9 from '../../../../../assets/categories/Wifi.png'
import cat10 from '../../../../../assets/categories/baby-stroller-ui-web-svgrepo-com 2.png'
import { BsArrowRight } from 'react-icons/bs'
import MoreCategoriesCard from './MoreCategoriesCard'


const MoreCategoriesList = () => {
    const categories = [
        {
            image: cat1,
            name: "LIDL",
        },
        {
            image: cat2,
            name: "euronics",
        },
        {
            image: cat3,
            name: "LIDL",
        },
        {
            image: cat4,
            name: "euronics",
        }, {
            image: cat5,
            name: "LIDL",
        },
        {
            image: cat6,
            name: "euronics",
        }, {
            image: cat7,
            name: "LIDL",
        },
        {
            image: cat8,
            name: "euronics",
        }, {
            image: cat9,
            name: "LIDL",
        },
        {
            image: cat10,
            name: "euronics",
        },
    ]

    const goToProduct = () => {
        // router.push("./filterProduct");
        // router.push("./shop");
        // localStorage.clear();
    };

    return (
        <>
            <div>
                <div className="flex flex-row items-center justify-between mb-9 ">
                    <div className="flex flex-col">
                        <div className="uppercase font-semibold text-lg font-ff-headings lg:text-xl">
                            More Categories
                        </div>
                        <div className="text-xs text-gray-400">
                            {/* Do not miss the current offers until the end of March. */}
                        </div>
                    </div>
                    <div
                        className=" p-2 h-9 flex flex-row rounded-full border border-gray-300 text-sm w-32 text-gray-500 px-4 justify-between cursor-pointer"
                        // onClick={goToProduct}
                    >
                        View All
                        <span>
                            <BsArrowRight className="text-lg"></BsArrowRight>
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">

            {categories.map((category: any, index: number) => (
                
                    <MoreCategoriesCard key={index} category={category}/>
                    
                ))}
            </div>
        </>
    );
}

export default MoreCategoriesList;