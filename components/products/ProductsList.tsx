import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { Button } from "../ui/button";
import { formatPrice } from "@/utils/format";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className='py-12 grid gap-4'>
      {products.map((item) => {
        const { id, name, price, description, company, image } = item;
        
        const shortDescription = description.substring(0, 160)
        const priceInDollar = formatPrice(price);

        return (
          <article key={id} className='relative'>
            <Link href={`/products/${id}`}>
              <Card>
                <CardContent className='p-6 flex flex-col justify-between gap-x-8 gap-y-4 md:flex-row'>
                  <Image
                    src={image}
                    width={2000}
                    height={2000}
                    quality={90}
                    alt={name}
                    className='h-56 w-full object-cover rounded md:w-56'
                  />
                  <div className='mt-4'>
                    <h4 className='head-4 mb-2'>{name}</h4>
                    <h5 className="mb-3 font-medium capitalize ">{company}</h5>
                    <p className='text-muted-foreground max-w-3xl'>
                      {`${shortDescription}.....`}
                    </p>
                  </div>

                  <p className='text-primary text-lg font-medium'>
                    {priceInDollar}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className='absolute right-4 bottom-4'>
              <FavoriteToggleButton productId={id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
