

import baseUrl from "../../../../../utils/baseUrl";
// import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import siteUrl from "../../../../../utils/siteUrl";

interface IProps {
    params: {
        newsId: string;
    };
}

interface newsInfo {
    status: string;
    expiredDate: string;
    _id: string;
    title: string;
    description: string;
    image: string;
}

async function getNews(newsId:any) {
    const response = await fetch(`${baseUrl}/news/find/${newsId}`,{ cache: 'no-store' })
    const data =await response.json()
    return data
}

const NewsPage =  async ({ params }: IProps) => {
    const newsId = params.newsId;
    // const news = await fetch(`${baseUrl}/news/find/${newsId}`,{ cache: 'no-store' }).then((res) => res.json())
    const news = await getNews(newsId)
    // const [news, setNews] = useState<newsInfo>({
    //     status: '',
    //     expiredDate: '',
    //     _id: '',
    //     title: '',
    //     description: 'string',
    //     image: ''
    // })


    // useEffect(() => {
    //     fetchData()
    // }, []);

    // async function fetchData() {
    //     try {
    //         const res = await axios.get(`${baseUrl}/news/find/${newsId}`);
    //         console.log(res.data)
    //         setNews(res.data)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const encodedUrl = encodeURIComponent(`${siteUrl}/news-preview/${newsId}`);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodedUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

    const dateString = news.expiredDate;
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
                    <div className="flex gap-2">
                        {/* <FacebookShareButton url={facebookShareUrl}>
                            <FacebookIcon size={35} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={twitterShareUrl}>
                            <TwitterIcon size={35} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton url={whatsappShareUrl}>
                            <WhatsappIcon size={35} round={true} />
                        </WhatsappShareButton> */}
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

export default NewsPage;