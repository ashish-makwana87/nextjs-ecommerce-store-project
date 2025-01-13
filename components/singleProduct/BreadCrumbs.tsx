import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'

function Breadcrumbs({name}: {name: string}) {

  return (
   <Breadcrumb>
   <BreadcrumbList>
   <BreadcrumbItem>
   <BreadcrumbLink href='/' className=' capitalize md:text-lg'>home</BreadcrumbLink>
   </BreadcrumbItem>
   <BreadcrumbSeparator />
   <BreadcrumbItem>
   <BreadcrumbLink href='/products' className=' capitalize md:text-lg'>products</BreadcrumbLink>
   </BreadcrumbItem>
   <BreadcrumbSeparator />
   <BreadcrumbItem>
   <BreadcrumbPage className=' capitalize md:text-lg'>{name}</BreadcrumbPage>
   </BreadcrumbItem>
   </BreadcrumbList>
   </Breadcrumb>
  )
}

export default Breadcrumbs