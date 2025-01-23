import React from "react";
import SectionTitle from "../global/SectionTitle";
import { fetchProductReviews } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ProductRating from "./ProductRating";
import Comment from "./Comment";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  if (reviews.length < 1) {
    return <EmptyList text='No reviews for this product' />;
  }

  return (
    <section>
      <SectionTitle text='product reviews' />
      <div className='grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6'>
        {reviews.map((review) => {
          return (
            <Card key={review.id} className='p-2'>
              <CardHeader className='flex flex-row gap-x-3'>
                <Image
                  src={review.authorImageUrl}
                  width={800}
                  height={800}
                  alt={review.authorName}
                  className='w-14 h-14 object-cover rounded-full'
                />
                <div className='flex flex-col'>
                  <h4 className='text-base font-semibold tracking-wide capitalize md:text-lg'>
                    {review.authorName}
                  </h4>
                  <ProductRating ratings={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <Comment text={review.comment} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default ProductReviews;
