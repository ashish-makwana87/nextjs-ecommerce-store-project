import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function AboutPage() {
  return (
    <div className='alignment flex flex-col gap-y-4 justify-center items-center mt-8 md:mt-16 md:gap-y-6'>
      <h2 className='font-bold text-4xl text-center md:text-5xl'>
        About Store
      </h2>
      <p className=' max-w-[50rem] text-center tracking-wide md:text-lg'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus
        eligendi provident, blanditiis ipsa dicta dolorem alias expedita dolorum
        voluptatibus. Beatae quis, cum nobis aperiam sapiente fugit voluptatem
        numquam veritatis saepe, delectus consectetur quo quasi nulla soluta at,
        voluptatum commodi tempore repellat ad. A cupiditate, velit doloremque
        aperiam nulla illum ducimus debitis, distinctio explicabo sint ad
        incidunt deleniti minima perspiciatis?
      </p>
      <Button asChild size='lg' className='w-32 md:w-36'>
        <Link href='/products' className='text-base md:text-lg'>
          Our Products
        </Link>
      </Button>
    </div>
  );
}

export default AboutPage;
