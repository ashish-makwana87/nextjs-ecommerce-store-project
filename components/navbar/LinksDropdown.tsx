import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa6";
import NavLinks from "@/utils/links";
import Link from "next/link";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='bg-transparent border-2 border-[#6c6c6c] flex gap-x-3 items-center justify-center focus:outline-none'
        >
          <UserIcon />
          <FaBars className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36' align='start' sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {NavLinks.map((item) => {
            return (
              <DropdownMenuItem key={item.label}>
                <Link href={item.href} className=' capitalize w-full'>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
