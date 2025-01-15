"use client";
import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

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
