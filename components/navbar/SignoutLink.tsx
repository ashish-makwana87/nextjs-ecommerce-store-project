"use client";
import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

// In this Component, "Link" is used instead of "button" inside SignOutButton because "redirectUrl" prop of SignOutButton creates an error sometimes. And since we want the user to navigate to the homepage after logout, "Link" is more suitable than "button"

function SignoutLink() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ description: "Logged out successfully" });
  };

  return (
    <SignOutButton>
      <Link href='/' className='w-full text-left' onClick={handleLogout}>
        Signout
      </Link>
    </SignOutButton>
  );
}

export default SignoutLink;
