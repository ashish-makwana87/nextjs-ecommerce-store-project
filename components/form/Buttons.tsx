'use client'

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TbReload } from "react-icons/tb";

type btnSize = 'sm' | 'default' | 'lg'; 

type submitButtonProps = {
 text?: string,
 size?: btnSize
}

export const SubmitBtn = ({text = 'submit', size = 'lg'}: submitButtonProps) => {
 
  const {pending} = useFormStatus();
  
 return <Button type="submit" size={size} disabled={pending} className=" capitalize">{pending ? <><TbReload className="mr-2 w-4 h-4 animate-spin" />Please wait</> : text}</Button>
}