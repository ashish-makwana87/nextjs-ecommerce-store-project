import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/singleProduct/AddToCart";
import Breadcrumbs from "@/components/singleProduct/BreadCrumbs";
import ProductRating from "@/components/singleProduct/ProductRating";
import { getSingleProduct } from "@/utils/actions";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import React from "react";

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await getSingleProduct(params.id);

  const { id, description, name, company, image, price } = product;
  const priceInDollar = formatPrice(price);

  return (
    <section className='alignment my-8 md:my-16'>
      <Breadcrumbs name={name} />
      <div className='grid gap-y-6 gap-x-10 mt-4 md:grid-cols-2'>
        <div>
          <Image
            className='rounded w-full h-60 md:h-full object-cover'
            src={image}
            alt={name}
            width={4000}
            height={4000}
            quality={90}
          />
        </div>
        <div>
          <div className='flex gap-x-8 items-center'>
            <h2 className='head-2'>{name}</h2>
            <FavoriteToggleButton productId={id} />
          </div>
          <ProductRating productId={id} />
          <h4>{company}</h4>
          <p className='mt-4 bg-muted inline-block rounded p-2'>
            {priceInDollar}
          </p>
          <p className='mt-6 text-base lg:text-lg text-muted-foreground'>
            {description}
          </p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
