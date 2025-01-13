import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa6";

function FavoriteToggleButton({ productId }: { productId: string }) {
  console.log(productId);

  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaHeart />
    </Button>
  );
}

export default FavoriteToggleButton;
