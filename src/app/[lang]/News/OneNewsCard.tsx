
import siteUrl from "../../../../utils/siteUrl";
import NewsShare from "./NewsShare";

const OneNewsCard = ({news, newsId}:any) => {
   
    const dateString = news?.expiredDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    console.log(news)
    return ( 
        <div className="container mx-auto xl:px-40 px-5 py-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="space-y-1">
                    <h6 className="text-lg font-semibold text-left ">{news.title}</h6>
                    <h6 className="text-xs">Expire Date - {formattedDate}</h6>
                    <div className="">
                       <NewsShare newsId={newsId} />
                    </div>
                </div>
                <div>
                    <div className="h-[450px] w-full ">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="object-contain h-full w-full "
                        />
                    </div>
                </div>
            </div>
            <div className="md:px-20">
                {news.description}
            </div>
        </div>
     );
}
 
export default OneNewsCard;