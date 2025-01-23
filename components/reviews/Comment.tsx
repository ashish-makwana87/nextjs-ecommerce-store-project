"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

function Comment({ text }: { text: string }) {
  const [showFull, setShowFull] = useState(true);

  if (text.length < 120) {
    return <div>{text}</div>;
  }

  return (
    <div>
      {showFull ? <p>{text.substring(0, 120)}...</p> : <p>{text}</p>}
      <Button
        variant='secondary'
        size='sm'
        onClick={() => setShowFull((prev) => !prev)}
        className='mt-3 md:mt-4 capitalize'
      >
        {showFull ? "show more" : "show less"}
      </Button>
    </div>
  );
}

export default Comment;
