import React from "react";

function EmptyList({ text = "no items found" }: { text?: string }) {
  return (
    <div className='mt-10 md:mt-20'>
      <h2 className='head-3'>{text}</h2>
    </div>
  );
}

export default EmptyList;
