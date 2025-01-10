import { fetchAllProducts } from '@/utils/actions'
import React from 'react'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'

async function ProductsContainer({layout, search}: {layout: string, search: string}) {
  
 const products = await fetchAllProducts()
 const totalProducts = products.length; 
 const searchTerm = search ? `&search=${search}` : ''; 

  return (
    <section className='alignment'>
      {totalProducts === 0 ? <h2 className='text-2xl md:text-3xl font-semibold mt-16'>Sorry, no matching products found</h2> : layout === 'grid' ? <ProductsGrid products={products} /> : <ProductsList products={products} />  }
    </section>
  )
}

export default ProductsContainer