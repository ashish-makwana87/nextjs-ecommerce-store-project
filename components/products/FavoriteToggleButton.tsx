import React from "react";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";

function FavoriteToggleButton({ productId }: { productId: string }) {
  console.log(productId);

  return (
    <Button
      size='icon'
      variant='outline'
      className='p-2 w-8 h-8 cursor-pointer'
      type='button'
      asChild
    >
      <FaRegHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
