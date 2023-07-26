const CheckoutSidebar = ({item, getPrice}: any) => {

    return (
        <tr className={`${item.expired? 'bg-gray-300':''}`}>
            <td className=" py-3 text-[13px] w-[50%]">
                <div>
                    {item.product_name}{" "}
                    <span className="font-semibold">× {item.count || 0}</span>
                </div>
            </td>
            {item.discount > 0 ? (
                <td className=" py-3 text-[15px] text-right">
                    {getPrice((item.unit_price - (item.unit_price / 100) * item.discount) * item.count)}
                </td>
            ) : (
                <td className=" py-3 text-[15px] text-right">
                    {getPrice(item.unit_price * item.count)}
                </td>
            )}
        </tr>
    );
};

export default CheckoutSidebar;
