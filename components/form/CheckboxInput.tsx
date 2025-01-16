
import React from 'react'
import { Checkbox } from '../ui/checkbox'


type CheckBoxProps = {

 name: string,
 label: string,
defaultChecked?: boolean
}

function CheckboxInput({name, label, defaultChecked = false}: CheckBoxProps) {
  return 
  (
   <div className='mb-3 flex items-center space-x-2'>
   <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
   <label htmlFor={name} className='capitalize text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{label}</label>
   </div>
  )
}


export default CheckboxInput