import { formatPrice } from '@/utils/format';
import { Product } from '@prisma/client'
import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

function ProductsGrid({products}:{products: Product[]}) {

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    {products.map((product) => {
     
     const {name, price, image, id} = product;
     const priceInDollar = formatPrice(price);

     return <article key={id}> 
      <Link href='/products' >
      <Card>
      <CardContent className='p-4'>
      <div className='relative h-64 rounded overflow-hidden'>
        <Image src={image} alt={name} fill className='absolute w-full rounded object-cover' />
      </div>
      <p>{priceInDollar}</p>
      </CardContent> 
      </Card>
      </Link>
     </article>
    })}
    </div>
  )
}

export default ProductsGrid