"use client";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import SelectProductAmount, { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/actions";
import { ProductSignInBtn, SubmitBtn } from "../form/Buttons";

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className='mt-4'>
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type='hidden' name='productId' value={productId} />{" "}
          <input type='hidden' name='amount' value={amount} />
          <SubmitBtn
            text='add to cart'
            size='lg'
            className='capitalize mt-6 md:text-base'
          />
        </FormContainer>
      ) : (
        <ProductSignInBtn />
      )}
    </div>
  );
}

export default AddToCart;
