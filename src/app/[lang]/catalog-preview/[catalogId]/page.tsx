import baseUrl from "../../../../../utils/baseUrl";
import CatalogCarousel from "../../components/CatalogOneItem/CatalogOneItem";



interface Props {
    
    params: {
        catalogId: string;
      };
}

const CatalogPreview: React.FC<Props> = async ({  params }) => {
   const catalog = await fetch(`${baseUrl}/catelog/book/find/${params.catalogId}`).then((res) => res.json())
    return (
        <div>
            <CatalogCarousel catalog={catalog} />
        </div>
    );
}

export default CatalogPreview;
