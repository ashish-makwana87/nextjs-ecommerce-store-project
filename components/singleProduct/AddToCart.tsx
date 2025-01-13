import React from "react";
import { Button } from "../ui/button";

function AddToCart({ productId }: { productId: string }) {

  console.log(productId);
  
  return (
    <Button className='capitalize mt-6 md:text-lg' size='lg'>
      add to cart
    </Button>
  );
}

export default AddToCart;
