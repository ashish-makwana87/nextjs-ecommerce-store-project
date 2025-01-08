import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <section className='grid lg:grid-cols-2 gap-20 pb-16'>
      <div className='order-1 flex flex-col gap-y-4 md:gap-y-6'>
        <h1 className='text-2xl max-w-2xl md:text-4xl font-bold tracking-wide '>
          NextJS E-commerce Store Project
        </h1>
        <p className='text-md max-w-xl md:text-lg font-normal leading-7 text-muted-foreground'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          voluptatem placeat consequatur quo doloremque? Ea recusandae porro
          explicabo minima animi culpa, nesciunt similique molestiae voluptatem
          cumque placeat blanditiis magnam numquam!
        </p>
        <Button asChild size='lg' className='w-32 md:w-36'>
          <Link href='/products' className='text-base md:text-lg'>
            Our Products
          </Link>
        </Button>
      </div>
      <div className='md:order-2'>
        <h2>Image placeholder</h2>
      </div>
    </section>
  );
}

export default HeroSection;
