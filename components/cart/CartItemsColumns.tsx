import { formatPrice } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

export const FirstColumn = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <div className='relative h-24 w-24 md:h-32 md:w-32'>
      <Image
        src={image}
        fill
        alt={name}
        className='object-cover rounded-md'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
    </div>
  );
};

export const SecondColumn = ({
  title,
  company,
  productId,
}: {
  title: string;
  company: string;
  productId: string;
}) => {
  return (
    <div className='md:w-44'>
      <Link
        href={`/products/${productId}`}
        className='font-medium tracking-wide capitalize hover:underline'
      >
        {title}
      </Link>
      <h6 className='tracking-wide capitalize text-sm mt-1'>{company}</h6>
    </div>
  );
};

export const FourthColumn = ({ price }: { price: number }) => {
  return <p className='font-medium md:ml-auto'>{formatPrice(price)}</p>;
};
