import baseUrl from "../../../../../utils/baseUrl";
import OneNewsCard from "../../News/OneNewsCard";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";
import {Locale} from "../../../../../i18n-config";

interface IProps {
    params: {
        newsId: string;
        lang: Locale;
    };
}

type Props = {
    params: { newsId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    {params, searchParams}: Props, parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        // read route params
        const id = params.newsId;

        // fetch data
        const news = await getNews(id);

        return {
            title: `Supersconto | ${news.title}`,
            description: news.news_description ?? `latest news at supersconto24 store`,
            openGraph: {
                images: [{
                    url: news.image,
                    secureUrl: news.image,
                    alt: news?.title,
                    width: 1200,
                    height: 630,
                }],
                title: `Supersconto | ${news?.title}`,
                description: news.description ?? `latest news at supersconto24 store`,
                type: "website"
            },
        };
    } catch (e) {
        return {
            title: `Supersconto | Not found`,
            description: `News not found`,
        }
    }
}

async function getNews(newsId: any) {
    const res = await fetch(`${baseUrl}/news/find/${newsId}`, {cache: 'no-store'})
    if (!res.ok) return undefined
    return res.json()
}

const NewsPage = async ({params}: IProps) => {
    const newsId = params.newsId;
    let news: any

    try {
        news = await getNews(newsId)

    } catch (err) {
        notFound()
    }


    return (
        <div>
            <OneNewsCard news={news} newsId={newsId} locale={params.lang}/>
        </div>
    );
}

export default NewsPage;