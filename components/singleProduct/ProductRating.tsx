import React from "react";
import { FaStar } from "react-icons/fa6";

function ProductRating({ productId }: { productId: string }) {
  const star = 4.6;
  const count = 32;
  const countValue = `(${count} reviews)`;
  return (
    <span className='flex gap-x-3 items-center mt-2 mb-4'>
      <FaStar className='w-3 h-3' /> {star} {countValue}{" "}
    </span>
  );
}

export default ProductRating;
