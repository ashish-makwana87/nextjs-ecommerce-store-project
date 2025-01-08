import React from 'react'
import SectionTitle from '../global/SectionTitle'
import { fetchFeaturedProducts } from '@/utils/actions'
import EmptyList from '../global/EmptyList'
import ProductsGrid from '../products/ProductsGrid'

async function FeaturedProducts() {

 const products = await fetchFeaturedProducts()
 
 if(products.length === 0) {
  return <EmptyList text='no products found' />
 }

  return (
    <div>
     <SectionTitle text={'featured products'} />
     <ProductsGrid products={products} />
    </div>
  )
}

export default FeaturedProducts