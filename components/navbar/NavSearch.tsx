import React from "react";
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='Search products...'
      className='max-w-xs border-2 border-[#6c6c6c] outline-none'
    />
  );
}

export default NavSearch;
