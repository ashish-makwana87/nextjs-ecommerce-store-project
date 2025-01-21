import { formatPrice } from '@/utils/format';
import { Product } from '@prisma/client'
import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';

function ProductsGrid({products}:{products: Product[]}) {

  return (
    <div className='py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    {products.map((product) => {
     
     const {name, price, image, id} = product;
     const priceInDollar = formatPrice(price);

     return <article key={id} className='relative'> 
      <Link href={`/products/${id}`}>
      <Card>
      <CardContent className='p-4'>
      <div className='relative h-56 rounded overflow-hidden'>
        <Image src={image} alt={name} fill priority className='absolute w-full rounded object-cover' />
      </div>
      <div className=' text-center mt-4'>
       <h2 className='text-lg font-medium capitalize'>{name}</h2>
       <p className='text-muted-foreground mt-2'>{priceInDollar}</p>
      </div>
      </CardContent> 
      </Card>
      </Link>
      <div className=' absolute top-6 right-6'>
      <FavoriteToggleButton productId={id} />
      </div>
     </article>
    })}
    </div>
  )
}

export default ProductsGrid