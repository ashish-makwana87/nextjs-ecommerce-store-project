'use client'
import Image from 'next/image';
import { useState } from 'react'
import FormContainer from './FormContainer';
import { updateImageAction } from '@/utils/actions';
import ImageInput from './ImageInput';
import { SubmitBtn } from './Buttons';
import { Button } from '../ui/button';

type UpdateImageProps = {
 name: string,
 image: string,
children?: React.ReactNode
}


function ImageInputContainer(props: UpdateImageProps) {

 const {name, image} = props;
 const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section>
     <Image src={image} width={500} height={500} alt={name} className='h-48 w-48 object-cover rounded' />
     <Button variant='outline' size='sm' onClick={() => setIsFormOpen((prev) => !prev)} className='my-4'>Update image</Button>
     {isFormOpen && <div><FormContainer action={updateImageAction}>
      {props.children}
     <ImageInput />
     <div className='my-4'><SubmitBtn /></div>
     </FormContainer></div>}
    </section>
  )
}

export default ImageInputContainer