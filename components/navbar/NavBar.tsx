import React from 'react'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import LinksDropdown from './LinksDropdown'

function NavBar() {

  return (
    <nav className='bg-[#f2f2f2]'>
     <div className='alignment flex flex-col md:flex-row md:justify-between md:items-center py-6 gap-y-2'>
      <Logo />
      <NavSearch />
      <div className='flex gap-x-4 items-center'>
       <LinksDropdown />
       <CartButton />
      </div>
     </div>
    </nav>
  )
}

export default NavBar