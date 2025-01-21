"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import {
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";

function ShareButton({ name, productId }: { name: string; productId: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareUrl = `${url}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='p-2 w-8 h-8 cursor-pointer'
        >
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='center'
        sideOffset={10}
        className='flex gap-x-2 items-center justify-center w-full'
      >
        <FacebookShareButton url={shareUrl} name={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl} name={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} name={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
