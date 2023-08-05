import baseUrl from "../../../../../utils/baseUrl";
import OneItem from "../../components/OneItem/OneItem";

// interface ItemData {
//     description: string;
//     quantity: number;
//     price: number;
//     title:string;
//     // any other properties
//   }
interface IProps {
    params: {
        itemId: string;
    };
}

const ItemPages = async ({params}: IProps) => {
    const itemId = params.itemId
    

    let data :any
    let tag :any
    let mainCategory:any
    let subCategory :any
    let allreview : any

    try {
//    const catalog = await fetch(`${baseUrl}/reviews/getReview/${itemId}`,{ cache: 'no-store' }).then((res) => res.json())
        
        data = await fetch(`${baseUrl}/catelog/item/find/${itemId}`,{ cache: 'no-store' }).then((res) => res.json())
        tag= data.tags
        mainCategory = await fetch(`${baseUrl}/category/categories/${data.product_category}`,{ cache: 'no-store' }).then((res) => res.json())
        subCategory = await fetch(`${baseUrl}/category/subcategories/${data.product_sub_category}`,{ cache: 'no-store' }).then((res) => res.json())
        allreview = await fetch(`${baseUrl}/reviews/getReview/${itemId}`,{ cache: 'no-store' }).then((res) => res.json())

    } catch (err) {
        console.log(err);
    }
    
    return (
        <>
            <OneItem tag={tag} data={data} allreview={allreview} subCategory={subCategory} mainCategory={mainCategory} itemId={itemId}/>
        </>
    );
};

export default ItemPages;


