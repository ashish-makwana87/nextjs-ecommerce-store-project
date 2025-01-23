import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ProductRating from "./ProductRating";
import Comment from "./Comment";

type ReviewInfoProps = {
  reviewInfo: { name: string; image: string; comment: string; rating: number };
  children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewInfoProps) {
  const { image, name, rating, comment } = reviewInfo;

  return (
    <div className='relative'>
      <Card className='p-2 min-h-64'>
        <CardHeader className='flex flex-row gap-x-3'>
          <Image
            src={image}
            width={800}
            height={800}
            alt={name}
            className='w-14 h-14 object-cover rounded-full'
          />
          <div className='flex flex-col'>
            <h4 className='text-base font-semibold tracking-wide capitalize md:text-lg'>
              {name}
            </h4>
            <ProductRating ratings={rating} />
          </div>
        </CardHeader>
        <CardContent>
          <Comment text={comment} />
        </CardContent>
      </Card>
      <div className="absolute top-6 right-6">
      {children}
      </div>
    </div>
  );
}

export default ReviewCard;
