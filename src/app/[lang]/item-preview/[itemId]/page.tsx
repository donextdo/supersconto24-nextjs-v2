import baseUrl from "../../../../../utils/baseUrl";
import OneItem from "../../components/OneItem/OneItem";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";

interface IProps {
    params: {
        itemId: string;
    };
}

type Props = {
    params: { itemId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const id = params.itemId;

    // fetch data
    const product = await fetch(`${baseUrl}/catelog/item/find/${id}`, {cache: 'no-store'}).then((res) => res.json());


    return {
       title: `Supersconto | ${product.product_name}`,
       description: product.product_description ?? `best selling items at supersconto24 store`,
        openGraph: {
            images: [product.product_image],
            title: `Supersconto | ${product.product_name}`,
            description: product.product_description ?? `best selling items at supersconto24 store`,
            type:"website"
        },
    };
}
async function fetchItem(itemId: string) {
    const res = await fetch(`${baseUrl}/catelog/item/find/${itemId}`, {cache: 'no-store'})
    if (!res.ok) return undefined
    return res.json()
}

const ItemPages = async ({params}: IProps) => {
    const itemId = params.itemId
    let data: any
    let tag: any
    let mainCategory: any
    let subCategory: any
    let allReview: any

    try {
        data = await fetchItem(itemId)
        tag = data.tags
        mainCategory = await fetch(`${baseUrl}/category/categories/${data.product_category}`, {cache: 'no-store'}).then((res) => res.json())
        subCategory = await fetch(`${baseUrl}/category/subcategories/${data.product_sub_category}`, {cache: 'no-store'}).then((res) => res.json())
        allReview = await fetch(`${baseUrl}/reviews/getReview/${itemId}`, {cache: 'no-store'}).then((res) => res.json())

    } catch (err) {
        notFound()
    }



    return (
        <>
            <OneItem tag={tag} data={data} allreview={allReview} subCategory={subCategory} mainCategory={mainCategory}
                     itemId={itemId}/>
        </>
    );
};

export default ItemPages;


