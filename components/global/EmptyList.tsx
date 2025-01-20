import React from 'react'


function EmptyList({text = 'no items found'}:{text?: string}) {

  return (
    <div className='alignment'>
     <h2 className='text-xl'>{text}</h2>
    </div>
  )
}

export default EmptyList