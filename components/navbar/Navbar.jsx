import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='flex items-center justify-between w-full shadow-xl py-6 padding-x'>
      <div>
        <h4 className='font-montserrat font-bold text-base'>Klokin</h4>
      </div>
      <div>
        <Link href="/admin/login" className='p-2 bg-blue-400 text-white'>Admins</Link>
      </div>
    </header>
  )
}

export default Navbar
