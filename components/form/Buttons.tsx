"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TbReload } from "react-icons/tb";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

type btnSize = "sm" | "default" | "lg";

type submitButtonProps = {
  text?: string;
  size?: btnSize;
  className?: string;
};

export const SubmitBtn = ({
  size = "lg",
  text = "submit",
  className = "",
}: submitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={size}
      disabled={pending}
      className={`capitalize ${className}`}
    >
      {pending ? (
        <>
          <TbReload className='mr-2 w-4 h-4 animate-spin' />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export const IconBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button size='icon' variant='ghost' type='submit'>
      {pending ? <TbReload className=' animate-spin' /> : <RiDeleteBinLine />}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        size='icon'
        variant='outline'
        className='p-2 w-8 h-8 cursor-pointer'
        type='button'
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      size='icon'
      variant='outline'
      className='p-2 w-8 h-8 cursor-pointer'
      type='submit'
    >
      {pending ? (
        <TbReload className=' animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export const ProductSignInBtn = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        className='capitalize mt-6 md:text-base'
        variant='default'
        size='lg'
      >
        sign in
      </Button>
    </SignInButton>
  );
};
