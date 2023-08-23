import React from 'react'
import { IoClose } from 'react-icons/io5'

function CartSideBar({item, getPrice}: any) {
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
           <button className='bg-[#e5e7eb] rounded-full p-1'><IoClose className="text-black text-xs"/></button>  {getPrice((item.unit_price - (item.unit_price / 100) * item.discount) * item.count)}
        </td>
    ) : (
        <td className=" py-3 text-[15px] text-right">
           <button className='bg-[#e5e7eb] rounded-full p-1'><IoClose className="text-black text-xs"/></button>  {getPrice(item.unit_price * item.count)}
        </td>
    )}
</tr>
  )
}

export default CartSideBar
