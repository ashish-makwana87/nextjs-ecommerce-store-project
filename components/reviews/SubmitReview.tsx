'use client'
import { useUser } from "@clerk/nextjs"
import EmptyList from "../global/EmptyList";
import { Button } from "../ui/button";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { submitReviewAction } from "@/utils/actions";
import { SubmitBtn } from "../form/Buttons";
import { Card } from "../ui/card";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";


function SubmitReview({productId}: {productId: string}) {
 const [showReviewForm, setShowReviewForm] = useState(false);

 const {user} = useUser();
 if(!user) return <EmptyList text="Please login to submit a review" />

  return (
    <div className="mt-6 md:mt-8">
     <Button variant='secondary' size='lg' className="bg-[#1f1f1f] text-white hover:bg-black hover:text-white text-base mb-6 md:mb-8" onClick={() => setShowReviewForm((prv) => !prv)} >Write review</Button>
     {showReviewForm && <Card className="p-6">
      <FormContainer action={submitReviewAction}>
      <input type="hidden" name="authorName" value={user?.firstName || 'user'} />
      <input type="hidden" name="authorImageUrl" value={user.imageUrl} />
      <input type="hidden" name="productId" value={productId} />
      <RatingInput name='rating' />
      <TextAreaInput name="comment" label="feedback" defaultValue="Good quality product." />
      <SubmitBtn />
      </FormContainer>
      </Card>}
    </div>
  )
}

export default SubmitReview