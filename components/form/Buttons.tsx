"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TbReload } from "react-icons/tb";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

type btnSize = "sm" | "default" | "lg";

type submitButtonProps = {
  text?: string;
  size?: btnSize;
};

export const SubmitBtn = ({
  text = "submit",
  size = "lg",
}: submitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={size}
      disabled={pending}
      className=' capitalize'
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

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        size='icon'
        variant='outline'
        className='p-2 w-8 h-8 cursor-pointer'
        type='button'
        asChild
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
      asChild
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
