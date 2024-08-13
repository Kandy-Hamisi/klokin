'use client'

import { useGlobalContext } from '@/context/globalContext';
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = () => {

  const { state, storeUser } = useGlobalContext();


  const [ userName, setUserName ] = useState('');
  const [ idNumber, setIdNumber ] = useState('');
  const router = useRouter();

  // retrieve the unique key from cookies or local storage

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post('https://klokin-backend.vercel.app/api/v1/users/login-admin', {
        userName,
        idNumber,
      });

      const user = response.data.user;

      toast.success(response.data.message);

      storeUser(user);
      router.push('/admin'); // Redirect to admin page after successful login

      console.log("Login Successful", response.data);
    } catch (error) {
      console.log("Error: ", error);
      toast.error('Failed to login. Please check your credentials and try again.');
    }

  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <Toaster />
      <div className='mb-4'>
        <label htmlFor="userName" className=''>Admin Username</label>
        <input onChange={(e) => setUserName(e.target.value)} type="text" name="userName" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Username.." id="" />
      </div>
      <div>
        <label htmlFor="idNumber">Admin Number</label>
        <input onChange={(e) => setIdNumber(e.target.value)} type="number" name="idNumber" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Admin Number.." id="" />
      </div>
      <div className='mt-4 w-full flex justify-center'>
        <button type='submit' className='text-center w-full bg-blue-400 text-white p-2'>Login Admin</button>
      </div>
    </form>
  )
}

export default LoginForm
