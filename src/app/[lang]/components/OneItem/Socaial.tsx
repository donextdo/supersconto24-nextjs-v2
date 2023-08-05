import { FaFacebookF, FaLinkedin, FaPinterest, FaReddit, FaTwitter, FaWhatsapp } from "react-icons/fa";
import siteUrl from "../../../../../utils/siteUrl";
import pic1 from '../../../../../assets/flyers/flyer_1.jpg'
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Supersconto | Flyer preview",
    openGraph: {
        title: 'Acme',
        description: 'Acme is a...',
        images: [
            {
              url: '<https://example.com/api/preview>',
              width: 1200,
              height: 600,
            }
        ]
      },
    
}

const Social = ({itemId}:any) => {
    const encodedUrl = encodeURIComponent(`${siteUrl}/item-preview/${itemId}`);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    const pinterestShareUrl = `https://pinterest.com/pin/create/bookmarklet/?url=${encodedUrl}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrl}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodedUrl}`;

    const facebookShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            facebookShareUrl,
            "facebook-share-dialog",
            "width=626,height=436"
        );
    };

    const twitterShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            twitterShareUrl,
            "twitter-share-dialog",
            "width=626,height=436"
        );
    };

    const pinterestShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            pinterestShareUrl,
            "pinterest-share-dialog",
            "width=626,height=436"
        );
    };

    const linkedinShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            linkedinShareUrl,
            "linkedin-share-dialog",
            "width=626,height=436"
        );
    };

    const redditShareClick = (e: any) => {
        e.preventDefault();
        window.open(redditShareUrl, "reddit-share-dialog", "width=626,height=436");
    };

    const whatsappShareClick = (e: any) => {
        e.preventDefault();
        window.open(
            whatsappShareUrl,
            "whatsapp-share-dialog",
            "width=626,height=436"
        );
    };
    return (
        <div className="flex flex-row gap-1.5 max-w-[229px] my-6">
            <div className="">
                <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={facebookShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-blue-700 flex items-center justify-center">
                        <FaFacebookF className="text-white"></FaFacebookF>
                    </div>
                </a>
            </div>
            <div className="">
                <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={twitterShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-cyan-500 flex items-center justify-center">
                        <FaTwitter className="text-white"></FaTwitter>
                    </div>
                </a>
            </div>
            <div className="">
                <a
                    href={pinterestShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={pinterestShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-red-600 flex items-center justify-center">
                        <FaPinterest className="text-white"></FaPinterest>
                    </div>
                </a>
            </div>
            <div className="">
                <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={linkedinShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-cyan-700 flex items-center justify-center">
                        <FaLinkedin className="text-white"></FaLinkedin>
                    </div>
                </a>
            </div>
            <div className="">
                <a
                    href={redditShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={redditShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-orange-600 flex items-center justify-center">
                        <FaReddit className="text-white"></FaReddit>
                    </div>
                </a>
            </div>
            <div className="">
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={whatsappShareClick}
                >
                    <div
                        className="h-[34px] w-[34px] rounded-full bg-green-500 flex items-center justify-center">
                        <FaWhatsapp className="text-white"></FaWhatsapp>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Social;