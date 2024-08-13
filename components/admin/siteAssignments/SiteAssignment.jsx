'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const SiteAssignment = () => {

    const [ allAssigments, setAllAssignments ] = useState([]);

    const fetchAllAssignments = async () => {
        try {
            const response = await axios.get('https://klokin-backend.vercel.app/api/v1/assignment');
            
            if (response.data.length > 0) {
                setAllAssignments(response.data);
            } else {
                toast.error('No assignments key found in response');
            }
        } catch (error) {
            toast.error('Error fetching assignments:', error);
        }
    };

    useEffect(() => {
        fetchAllAssignments();
    }, []);

    const today = new Date().toISOString().split('T')[0];
    
    // filter assignments for the current day
    const getCurrentDayAssignments = () => {
        const today = new Date().toISOString().split('T')[0]; //Get the current date in 'YYY-MM-DD' format
        return allAssigments?.filter(assignment => {
            const assignmentDate = new Date(assignment.date).toISOString().split('T')[0]; //Get the date of the assignment in 'YYYY-MM-DD' format
            return assignmentDate === today;
        });
    };

    const currentDayAssignments = getCurrentDayAssignments();

  return (
    <div className='mt-8'>
        <Toaster />
      <h4 className='mt-4 font-bold text-3xl'>{today}</h4>
      {currentDayAssignments?.length > 0 ? (
        <div>
            {currentDayAssignments.map(assignment => (
                <div key={assignment._id} className='flex justify-between items-center gap-4 mt-4 bg-gray-50 p-2 rounded-md shadow-md'>
                    <div>
                        <p className='font-medium mb-3'>{assignment.siteId.location}</p>
                        <p className='font-bold text-blue-500'>{assignment.userId.userName}</p>
                    </div>
                    <div>
                    <p className=''>Clock In Time: {assignment.clockInTime ? new Date(assignment.clockInTime).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi', hour12: false }) : <span className='font-bold text-red-500'>Not Clocked In</span>}</p>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <p>No assignments today</p>
        )}
    </div>
  )
}

export default SiteAssignment
