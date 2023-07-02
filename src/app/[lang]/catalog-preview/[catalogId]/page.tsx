import baseUrl from "../../../../../utils/baseUrl";
import CatalogCarousel from "../../components/CatalogOneItem/CatalogOneItem";
import React from "react";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "Supersconto | Flyer preview"
}
interface Props {
    
    params: {
        catalogId: string;
      };
}

const CatalogPreview: React.FC<Props> = async ({  params }) => {
   const catalog = await fetch(`${baseUrl}/catelog/book/find/${params.catalogId}`,{ cache: 'no-store' }).then((res) => res.json())
    return (
        <div>
            <CatalogCarousel catalog={catalog} />
        </div>
    );
}

export default CatalogPreview;
