import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';


function LoadingContainer() {

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
    <ProductLoading />
    <ProductLoading />
    <ProductLoading />
    </div>
  )
}

function ProductLoading() {

return <Card>
  <CardContent className='p-4'>
  <Skeleton className='h-48 w-full' />
  <Skeleton className='h-4 w-2/3 mt-3' />
  <Skeleton className='h-4 w-1/3 mt-3' />
  </CardContent>
</Card>
}

export default LoadingContainer;