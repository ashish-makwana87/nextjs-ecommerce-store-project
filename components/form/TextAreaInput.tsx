import React from 'react'
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaProps = {
 name: string;
 label?: string;
 defaultValue?: string;
};

function TextAreaInput({name, label, defaultValue}: TextAreaProps) {

  return (
   <div className='mb-3'>
    <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Textarea id={name} name={name} defaultValue={defaultValue} rows={5} required className="mt-1" />
   </div>
  )
}

export default TextAreaInput