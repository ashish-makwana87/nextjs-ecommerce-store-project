import React from "react";
import SectionTitle from "../global/SectionTitle";
import { fetchProductReviews } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  if (reviews.length < 1) {
    return (
      <div className='mt-10 md:mt-20'>
        <h2 className='head-3'>No reviews for this product</h2>
      </div>
    );
  }

  return (
    <section>
      <div>
        <SectionTitle text='product reviews' />
        <div className='grid md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-10'>
          {reviews.map((review) => {
            const { authorImageUrl, authorName, comment, rating } = review;

            const reviewInfo = {
              name: authorName,
              image: authorImageUrl,
              comment,
              rating,
            };

            return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
