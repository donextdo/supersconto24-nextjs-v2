import baseUrl from "../../../../../utils/baseUrl";
import OneItem from "../../components/OneItem/OneItem";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";
import {Locale} from "../../../../../i18n-config";

interface ItemPagesProps {
    params: {
        itemId: string;
        lang: Locale;
    };
}

type Props = {
    params: { itemId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    {params, searchParams}: Props, parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        // read route params
        const id = params.itemId;

        // fetch data
        const product = await fetchItem(id);


        return {
            title: `Supersconto | ${product.product_name}`,
            description: product.product_description ?? `best selling items at supersconto24 store`,
            openGraph: {
                images: [{
                    url: product.product_image,
                    secureUrl: product.product_image,
                    alt: product.product_name,
                    width: 1200,
                    height: 630,
                }],
                title: `Supersconto | ${product.product_name}`,
                description: product.product_description ?? `best selling items at supersconto24 store`,
                type: "website",
            },
        };
    } catch (e) {
        return {
            title: `Supersconto | Not found`,
            description: `Product not found`,
        }
    }
}

async function fetchItem(itemId: string) {
    const res = await fetch(`${baseUrl}/catelog/item/find/${itemId}`, {cache: 'no-store'})
    if (!res.ok) return undefined
    return res.json()
}

const ItemPages = async ({params}: ItemPagesProps) => {
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
            <OneItem tag={tag} data={data} allreview={allReview} subCategory={subCategory} locale={params.lang}
                     mainCategory={mainCategory}
                     itemId={itemId}/>
        </>
    );
};

export default ItemPages;


