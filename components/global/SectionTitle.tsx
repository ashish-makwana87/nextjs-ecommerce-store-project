
import React from 'react'
import { Separator } from '../ui/separator'

function SectionTitle({text}:{text: string}) {

  return (
    <div>
      <h2 className='text-2xl font-semibold tracking-wide capitalize mb-8 md:text-3xl'>{text}</h2>
      <Separator />
    </div>
  )
}

export default SectionTitle