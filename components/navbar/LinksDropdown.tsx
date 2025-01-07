import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa6";
import NavLinks from "@/utils/links";
import Link from "next/link";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='bg-transparent border-2 border-[#6c6c6c] flex items-center justify-center focus:outline-none'
        >
          <FaBars />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="start" >
        {NavLinks.map((item) => {
          return (
            <DropdownMenuItem key={item.label}>
            <Link href={item.href} className=" capitalize w-full" >{item.label}</Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
