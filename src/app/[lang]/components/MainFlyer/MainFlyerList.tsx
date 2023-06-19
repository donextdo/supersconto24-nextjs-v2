"use client"
const MainFlyerList = ({dictionary}: {
    dictionary: {
        loadMore: string
    }
}) => {

    console.log("render", dictionary)
    return (
        <div>
            <div className='w-full h-[80vh] grid grid-cols-2 gap-x-2 gap-y-5
        overflow-y-scroll overflow-x-hidden scrollbar-w-2 sm:grid-cols-4
        xxl:grid-cols-4 bg-black'>

            </div>

            <button
                className="w-full  bg-primary py-2 px-6 text-base font-medium text-white rounded-md hover:bg-primary/80">
                {dictionary.loadMore}
            </button>
        </div>
    );
}

export default MainFlyerList;