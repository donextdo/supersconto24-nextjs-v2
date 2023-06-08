

import NewProductList from '@/components/NewProduct/NewProductList'
import ProductList from '@/features/product/ProductList'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='container mx-auto xl:px-40 px-5'>
      {/* <NewProductList /> */}
      <ProductList />
      
      </div>
  )
}
