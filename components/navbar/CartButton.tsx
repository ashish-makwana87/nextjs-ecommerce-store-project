import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IoCartOutline } from "react-icons/io5";
import { fetchCartItems } from '@/utils/actions';

async function CartButton() {
  
  const cartItems = await fetchCartItems(); 
  
  return (
    <Button asChild variant='outline' size='icon' className='bg-transparent border-2 border-[#6c6c6c] flex items-center justify-center relative' >
      <Link href='/cart'><IoCartOutline />
      <span className='absolute -top-3 -right-3 bg-primary h-6 w-6 rounded-full text-white flex items-center justify-center'>{cartItems}</span>
      </Link>
    </Button>
  )
}

export default CartButton