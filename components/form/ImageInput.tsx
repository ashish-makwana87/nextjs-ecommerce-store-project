import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const name = 'image'

function ImageInput() {

  return (
    <div className='mb-3'>
       <Label htmlFor={name} className='capitalize'>Upload image</Label>
       <Input id={name} name={name} type='file' accept='image/*' required className='mt-1' />
       </div>
  )
}

export default ImageInput