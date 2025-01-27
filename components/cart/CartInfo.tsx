import { Cart } from "@prisma/client";
import React from "react";
import { Separator } from "../ui/separator";
import { formatPrice } from "@/utils/format";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createOrderAction } from "@/utils/actions";

function CartInfo({ cart }: { cart: Cart }) {
  const { cartTotal, orderTotal, shipping, tax } = cart;

  return (
    <div>
      <Card className='p-4'>
        <CartRow label='cart total' value={cartTotal} />
        <CartRow label='tax' value={tax} />
        <CartRow label='shipping' value={shipping} />
        <CardTitle className='mt-8'>
          <CartRow label='order total' value={orderTotal} isLast={true} />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <Button
          type='submit'
          variant='default'
          className='mt-6 w-full capitalize'
        >
          place order
        </Button>
      </FormContainer>
    </div>
  );
}

function CartRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: number;
  isLast?: boolean;
}) {
  return (
    <div>
      <p className='flex justify-between items-center text-sm'>
        <span className='capitalize'>{label}</span>
        <span className='font-semibold'>{formatPrice(value)}</span>
      </p>
      {isLast ? null : <Separator className='my-2' />}
    </div>
  );
}

export default CartInfo;
