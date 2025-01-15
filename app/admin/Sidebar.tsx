"use client";
import { Button } from "@/components/ui/button";
import { AdminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathName = usePathname();

  return (
    <aside>
      {AdminLinks.map((item) => {
        const activePath = pathName === item.href;

        return (
          <Button
            key={item.label}
            variant={activePath ? "default" : 'ghost'}
            asChild
            className='mb-3 w-full capitalize text-start text-base md:text-lg'
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default Sidebar;
