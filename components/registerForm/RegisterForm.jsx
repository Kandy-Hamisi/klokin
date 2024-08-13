'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const RegisterForm = () => {
    // get the fullName, idNumber and also generate a unique key

    const router = useRouter();


    const [ userName, setUserName ] = useState('');
    const [ idNumber, setIdNumber ] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        const uniqueKey = uuidv4();

        try {
            const response = await axios.post('https://klokin-backend.vercel.app/api/v1/users/create', {
                userName,
                idNumber,
                uniqueKey
            });

            console.log("Registration Successful", response.data);
            setIdNumber('');
            setUserName('');

            document.cookie = `uniqueKey=${uniqueKey}; path=/; max-age=${60*60*24*365}`;
            localStorage.setItem('uniqueKey', uniqueKey);

            toast.success(response.data.message);
            router.push('/login'); // Redirect to dashboard page after successful registration

        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

  return (
    <form className='' onSubmit={handleSubmit}>
      <Toaster />
      <div className='mb-4'>
        <label htmlFor="userName" className=''>Full Name<span className='text-red-500'>*</span></label>
        <input onChange={(e) => setUserName(e.target.value)} type="text" name="userName" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Full Name.." id="" />
        <p className='mt-3 text-sm text-blue-400'>This is your full name as per you national ID</p>
      </div>
      <div>
        <label htmlFor="idNumber">ID Number<span className='text-red-500'>*</span></label>
        <input onChange={(e) => setIdNumber(e.target.value)} type="text" name="idNumber" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Data Collector ID Number.." id="" />
      </div>
      <div className='mt-4 w-full flex justify-center'>
        <button type='submit' className='text-center w-full bg-blue-400 text-white p-2'>Register</button>
      </div>
      <div className='mt-4'>
        <p className='text-sm'>Already Registered? <Link href="/login" className='text-blue-500'>Login</Link></p>
      </div>
    </form>
  )
}

export default RegisterForm
