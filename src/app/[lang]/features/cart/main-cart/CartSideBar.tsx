import React from 'react'
import { IoClose } from 'react-icons/io5'

function CartSideBar({item, getPrice,handleDelete}: any) {
  return (
    <tr className={`${item.expired? 'bg-gray-300':''}`}>
    <td className=" py-3 text-[13px] w-[50%]">
        <div>
            {item.product_name}{" "}
            <span className="font-semibold">× {item.count || 0}</span>
        </div>
    </td>

        <td className=" py-3 text-[15px] text-right">
            <button className='bg-[#e5e7eb] rounded-full p-1' onClick={() => handleDelete(item)}>
                <IoClose className="text-black text-xs"/>
            </button>
            {item.discount > 0 ?
                getPrice((item.unit_price - (item.unit_price / 100) * item.discount) * item.count) :
                getPrice(item.unit_price * item.count)
            }
        </td>
</tr>
  )
}

export default CartSideBar
