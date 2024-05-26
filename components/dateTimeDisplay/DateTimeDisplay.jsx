'use client'

import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Clean up the interval on component unmount
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 className='font-montserrat font-bold text-xl'>Current Date and Time</h2>
      <p className='font-montserrat mt-4'>{formatDateTime(currentDateTime)}</p>
    </div>
  );
};

export default DateTimeDisplay;
