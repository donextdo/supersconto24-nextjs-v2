const OneShop = ({ flyer}: any) => {
    const dateString = flyer.expiredate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "numeric",
    });
    return (
        <div className="flex flex-row gap-2 w-full border bg-[#f5f5f5] shadow-lg rounded-md">
            <div className="w-[200px] h-[250px]">
                <img
                    src={flyer.pages[0]?.page_image}
                    alt="item1"
                    className="object-contain w-full h-full "
                />
            </div>
            <div className="">
               
                <h1 className="font-bold text-lg text-ellipsis overflow-hidden ...">{flyer.title}</h1>
                <h1 className="text-sm text-black font-semibold">
                    {formattedDate}
                </h1>
            </div>

        </div>
    );
}

export default OneShop;