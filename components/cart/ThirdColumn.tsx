"use client";
import React, { useState } from "react";
import SelectProductAmount, {
  Mode,
} from "../singleProduct/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { SubmitBtn } from "../form/Buttons";
import { useToast } from "@/hooks/use-toast";

function ThirdColumn({ id, quantity }: { id: string; quantity: number }) {
  const [amount, setAmount] = useState(quantity);
  const {toast} = useToast();

  const handleAmountChange = async (value: number) => {
    toast({description: 'Calculating...'})
    await updateCartItemAction({ amount: value, cartItemId: id });
    setAmount(value);
    toast({description: 'Cart updated successfully'})
  };

  return (
    <div>
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type='hidden' name='id' value={id} />
        <SubmitBtn text='remove' size='sm' className='mt-2' />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
