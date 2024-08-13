'use client'

import { useGlobalContext } from '@/context/globalContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AssignedSites = () => {

    const { retrieveUser, state } = useGlobalContext();
    const [fetchedAssignments, setFetchedAssignments] = useState([]);
    
    useEffect(() => {
        retrieveUser();
    }, []);

    const retrievedUser = state?.user;

    const fetchUserAssignment = async (userId) => {
        try {
            const response = await axios.get(`https://klokin-backend.vercel.app/api/v1/assignment/get-user-assignments/${userId}`);
            
            // Ensure the response structure
            console.log("Full API Response:", response.data);
            
            if (response.data.assignments) {
                setFetchedAssignments(response.data.assignments);
            } else {
                console.error('No assignments key found in response');
            }
        } catch (err) {
            console.error('Error fetching user assignments:', err);
        }
    };

    useEffect(() => {
        if (retrievedUser) {
            fetchUserAssignment(retrievedUser._id);
        } else {
            console.error('User data is not available in the state.');
        }
    }, [retrievedUser]);

    console.log("Fetched assignments: ", fetchedAssignments);

    // filter assignments for the current day
    const getCurrentDayAssignments = () => {
        const today = new Date().toISOString().split('T')[0]; //Get the current date in 'YYY-MM-DD' format
        return fetchedAssignments?.filter(assignment => {
            const assignmentDate = new Date(assignment.date).toISOString().split('T')[0]; //Get the date of the assignment in 'YYYY-MM-DD' format
            return assignmentDate === today;
        });
    };

    const currentDayAssignments = getCurrentDayAssignments();

    const handleClockIn = async (assignmentId) => {

        const clockInTime = new Date().toISOString();

        console.log(clockInTime);
        console.log(assignmentId);

        try {
            const response = await axios.post(`https://klokin-backend.vercel.app/api/v1/assignment/clockin/${assignmentId}`, {
                clockInTime,
            });

            toast.success("Clocked In Successfully");
        } catch (error) {
            console.error('Error clocking in:', error);
        }
    }

    return (
        <div>
            <h1>Sites Assigned for Today</h1>
            {currentDayAssignments?.length > 0 ? (
                <div>
                    {currentDayAssignments.map(assignment => (
                        <div key={assignment._id} className='flex justify-between items-center gap-4 mt-4 bg-gray-50 p-2 rounded-md shadow-md'>
                            <div>
                                <p className='font-medium mb-3'>{assignment.siteId.location}</p>
                            </div>
                            <div>
                                {
                                    assignment.clockInTime ? <span className='text-green-500'>Clocked In</span>
                                        : <button onClick={() => handleClockIn(assignment._id)} className='p-2 bg-blue-500 text-white text-xs rounded-md'>Clockin</button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No assignments today</p>
            )}
        </div>
    );
};

export default AssignedSites;
