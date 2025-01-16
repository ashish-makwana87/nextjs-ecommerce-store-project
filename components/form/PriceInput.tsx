import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PriceInputProps = {
 defaultValue?: number
}

const name = 'price';

function PriceInput({defaultValue}: PriceInputProps) {

  return (
   <div className='mb-3'>
   <Label htmlFor={name} className='capitalize'>Price ($)</Label>
   <Input id={name} name={name} type='number' min={1} defaultValue={defaultValue || 99} required className='mt-1' />
   </div>
  )
}

export default PriceInput