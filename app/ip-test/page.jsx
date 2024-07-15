'use client'


import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [ip, setIp] = useState('');

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setIp(response.data.ip);
            } catch (error) {
                console.error('Error fetching the IP address:', error);
            }
        };

        fetchIp();
    }, []);

  return (
    <main className='relative'>
      <section className='padding'>
        <section className="max-container">
            <h1>Ip address testing</h1>
            <button className='p-2 bg-blue-300 rounded-md text-white mt-6'>Get the Ip address</button>

            <h1>Your IP address is: {ip}</h1>
        </section>
      </section>
    </main>
  )
}

export default page
