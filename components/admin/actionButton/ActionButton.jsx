import Link from 'next/link'
import React from 'react'

const ActionButton = ({ textContent, redirect }) => {
  return (
    <Link href={redirect} className='p-2 bg-blue-500 text-white rounded-md mb-4 '>
      {textContent}
    </Link>
  )
}

export default ActionButton
