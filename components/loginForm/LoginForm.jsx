'use client'

import { useGlobalContext } from '@/context/globalContext';
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

  const { state, storeUser } = useGlobalContext();


  const [ userName, setUserName ] = useState('');
  const [ idNumber, setIdNumber ] = useState('');
  const router = useRouter();

  // retrieve the unique key from cookies or local storage

  

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Check if the uniqueKey cookie exists
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const uniqueKeyCookie = cookies.find(row => row.startsWith('uniqueKey='));
    const uniqueKey = uniqueKeyCookie ? uniqueKeyCookie.split('=')[1] : null;

    if (!uniqueKey) {
        console.log('Unique key not found. This device is not associated with any user.');
        // Optionally, you can show an alert or a message to the user
        alert('This device is not associated with any user.');
        return; // Exit the function if the unique key is not found
    }

    try {
      const response = await axios.post('https://klokin-backend.vercel.app/api/v1/users/login-user', {
        userName,
        idNumber,
        uniqueKey
      });

      const user = response.data.user;

      console.log(response.data);

      storeUser(user);
      router.push('/home'); // Redirect to home page after successful login

      console.log("Login Successful", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }

  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor="userName" className=''>Data Collector Username</label>
        <input onChange={(e) => setUserName(e.target.value)} type="text" name="userName" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Username.." id="" />
      </div>
      <div>
        <label htmlFor="idNumber">Data Collector ID Number</label>
        <input onChange={(e) => setIdNumber(e.target.value)} type="number" name="idNumber" className='mt-3 p-2 w-full bg-slate-200 border border-gray-500/40' placeholder="Enter Admin Number.." id="" />
      </div>
      <div className='mt-4 w-full flex justify-center'>
        <button type='submit' className='text-center w-full bg-blue-400 text-white p-2'>Login</button>
      </div>
    </form>
  )
}

export default LoginForm
