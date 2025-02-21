import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import heroImg from "@/public/hero6.jpg";

function HeroSection() {
  return (
    <section className='grid md:grid-cols-2 gap-8 items-center pb-16'>
      <div className='order-1 flex flex-col gap-y-4 md:gap-y-6'>
        <h1 className='head-1 max-w-2xl'>NextJS E-commerce Store Project</h1>
        <p className='text-md max-w-xl md:text-lg font-normal leading-7 text-muted-foreground'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          voluptatem placeat consequatur quo doloremque? Ea recusandae porro
          explicabo minima animi culpa, nesciunt similique molestiae voluptatem
          cumque placeat blanditiis magnam numquamn!
        </p>
        <Button asChild size='lg' className='w-32 md:w-36'>
          <Link href='/products' className='text-base md:text-lg'>
            Our Products
          </Link>
        </Button>
      </div>
      <div className='md:order-2'>
        <Image
          src={heroImg}
          width={4000}
          height={4000}
          quality={90}
          alt='hero-image'
          className='rounded w-full h-full object-cover'
        />
      </div>
    </section>
  );
}

export default HeroSection;
