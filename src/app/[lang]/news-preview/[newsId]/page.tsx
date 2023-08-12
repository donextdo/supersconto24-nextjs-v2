import baseUrl from "../../../../../utils/baseUrl";
import OneNewsCard from "../../News/OneNewsCard";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";

interface IProps {
    params: {
        newsId: string;
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
                images: [news.image],
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
            <OneNewsCard news={news} newsId={newsId}/>
        </div>
    );
}

export default NewsPage;