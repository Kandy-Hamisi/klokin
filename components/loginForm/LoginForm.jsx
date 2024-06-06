import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
  return (
    <form className=''>
      <div className='mb-4'>
        <label htmlFor="userName" className=''>Username</label>
        <input type="text" name="userName" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Username.." id="" />
      </div>
      <div>
        <label htmlFor="idNumber">Admin Number</label>
        <input type="text" name="idNumber" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Admin Number.." id="" />
      </div>
      <div className='mt-4 w-full flex justify-center'>
        <Link href="/admin"  type='submit' className='text-center w-full bg-blue-400 text-white p-2'>Login</Link>
      </div>
    </form>
  )
}

export default LoginForm
