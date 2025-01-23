import { fetchProductRating } from "@/utils/actions";
import React from "react";
import { FaStar } from "react-icons/fa6";

async function ProductRating({ productId }: { productId: string }) {

  const average = await fetchProductRating({productId})
  const star = average.rating;
  const count = average.count;
  const countValue = `(${count} reviews)`;
 
  return (
    <span className='flex gap-x-3 items-center mt-2 mb-4'>
      <FaStar className='w-3 h-3' /> {star} {countValue}{" "}
    </span>
  );
}

export default ProductRating;
