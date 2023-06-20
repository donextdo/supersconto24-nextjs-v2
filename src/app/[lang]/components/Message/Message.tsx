const Message = () => {
    const message = process.env.NEXT_PUBLIC_SPECIAL_NEWS;

    return ( 
        // <div className="w-full text-white bg-[#233a95] text-xs text-center py-[9px]">Due to the <span className="font-semibold">COVID 19</span> epidemic, orders may be processed with a slight delay</div>
        <div className="w-full text-white bg-primary text-xs text-center py-[9px]">{message}</div>
     );
}
 
export default Message;