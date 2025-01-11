import ProductsContainer from "@/components/products/ProductsContainer";
import React from "react";

function ProductsPage({searchParams}: {searchParams: {layout?: string, search?:string }}) {
  
 
  const layout = searchParams.layout || 'grid'; 
  const search = searchParams.search || ''
 
  return <section className='alignment mt-10 md:mt-20'>
    <ProductsContainer layout={layout} search={search} />
  </section>;
}

export default ProductsPage;
