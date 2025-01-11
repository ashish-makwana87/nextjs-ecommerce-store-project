import { fetchAllProducts } from '@/utils/actions'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { Button } from '../ui/button';
import Link from 'next/link';
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { Separator } from '../ui/separator';

async function ProductsContainer({layout, search}: {layout: string, search: string}) {
 
 const products = await fetchAllProducts({search})
 const totalProducts = products.length; 
 const searchTerm = search ? `&search=${search}` : ''; 

  return (
    <section >
      <div className='flex items-center justify-between'>
      <h2 className='head-3'>{totalProducts} product{totalProducts > 1 && 's'}</h2>
      <div className='flex gap-x-2'>
      <Button variant={layout === 'grid' ? 'default' : 'outline'} size='icon' asChild>
        <Link href={`/products?layout=grid${searchTerm}`}><IoGridOutline /></Link>
      </Button>
      <Button variant={layout === 'list' ? 'default' : 'outline'} size='icon' asChild>
        <Link href={`/products?layout=list${searchTerm}`}><MdOutlineFormatListBulleted /></Link>
      </Button>
      </div>
      </div>
      <Separator className='mt-6 md:mt-8' />
      <div>
      {totalProducts === 0 ? <h2 className='text-2xl md:text-3xl font-semibold mt-16'>Sorry, no matching products found</h2> : layout === 'grid' ? <ProductsGrid products={products} /> : <ProductsList products={products} />  }
      </div>
    </section>
  )
}

export default ProductsContainer