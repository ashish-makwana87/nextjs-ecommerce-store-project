import CartInfo from "@/components/cart/CartInfo";
import CartItemsList from "@/components/cart/CartItemsList";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

async function CartPage() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const presentCart = await fetchOrCreateCart({ userId });
  const {currentCart, cartItems} = await updateCart(presentCart);

  if (cartItems.length === 0) {
    return (
      <div className='alignment mt-10 md:mt-20'>
        <SectionTitle text='your cart is empty' />
      </div>
    );
  }

  return (
    <section className='alignment mt-10 md:mt-20'>
      <SectionTitle text='your cart' />
      <div className='mt-6 mb-12 grid gap-6 md:mt-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4'>
          <CartInfo cart={currentCart} />
        </div>
      </div>
    </section>
  );
}

export default CartPage;
