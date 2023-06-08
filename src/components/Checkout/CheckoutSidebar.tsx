const CheckoutSidebar = ({item}:any) => {
    let discountprice;
    discountprice = item.unit_price * (item.discount / 100)
    let newprice = item.unit_price - discountprice

    let subtotal = (item.count) * (newprice)

    // const MAX_LENGTH = 20; // Maximum number of characters to display

    // let displayName = item.title;
    // if (item.title.length > MAX_LENGTH) {
    //     displayName = item.title.substring(0, MAX_LENGTH) + '...';
    // }
    console.log(item)

    return ( 
        <tr>
            <td className=" py-3 text-[13px] w-[50%]">
                {/* <Tooltip title={item.title} followCursor> */}

                    <div>
                        {item.product_name} <span className="font-semibold">× {item.count || 0}</span>
                    </div>
                {/* </Tooltip> */}
                </td>
            <td className=" py-3 text-[15px] text-right">Rs {subtotal.toFixed(2)}</td>
        </tr>

     );
}
 
export default CheckoutSidebar;