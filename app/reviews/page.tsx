import { IconBtn } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import React from "react";

async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length < 1) {
    return <EmptyList text='You have no reviews yet' />;
  }

  return (
    <div className='alignment mt-10 md:mt-20'>
      <SectionTitle text='Your reviews' />
      <div className='grid md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-10'>
        {reviews.map((review) => {
          const reviewInfo = {
            name: review.product.name,
            image: review.product.image,
            rating: review.rating,
            comment: review.comment,
          };

          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </div>
    </div>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteTheReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteTheReview}>
      <IconBtn />
    </FormContainer>
  );
};

export default ReviewsPage;
