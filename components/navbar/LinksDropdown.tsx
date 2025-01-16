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
import SignoutLink from "./SignoutLink";
import { auth } from "@clerk/nextjs/server";

// dropdown stays open after navigating to pages, we can use "use client" and implement "usePathname" hook to resolve it. --code-- const pathName = usePathname() -- <DropdownMenu key={pathName}> --code-- But then we can't import server only component "UserIcon" inside client component.

function LinksDropdown() {

 const isAdmin = auth().userId === process.env.ADMIN_USER_ID

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
             
             if(item.label === 'dashboard' && !isAdmin) {
              return null
             }

            return (
              <DropdownMenuItem key={item.label}>
                <Link href={item.href} className=' capitalize w-full'>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignoutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
