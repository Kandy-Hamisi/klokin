'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssignPage = () => {
    
    const [fetchedSites, setFetchedSites] = useState([]);
    const [userList, setUserList] = useState([]);

    const [assignment, setAssignment] = useState({
        userId: '',
        siteId: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAssignment((prevState) => ({
           ...prevState,
            [name]: value
        }));
        console.log({ ...assignment, [name]: value });
    };

    // Filter out users who are not "admin"
    const filteredUsers = userList.filter((singleUser) => singleUser.role !== "admin");

    const handleAssign = async (e) => {
        e.preventDefault();
        
        if (assignment.userId && assignment.siteId && assignment.date) {
            try {
                const res = await axios.post("https://klokin-backend.vercel.app/api/v1/assignment/assign-site", assignment);

                toast.success("Site assignment successful!");

                // Reset form fields
                setAssignment({
                    userId: '',
                    siteId: '',
                    date: ''
                });
            } catch (error) {
                toast.error(`Error: ${error.response?.data?.message || error.message}`);
                console.log(`Error: ${error.response?.data?.message || error.message}`);
            }
        } else {
            alert('Please select a user, site, and date.');
        }
    };

    const fetchSites = async () => {
        try {
            const response = await axios.get("https://klokin-backend.vercel.app/api/v1/sites");
            setFetchedSites(response.data.sites);
        } catch (error) {
            toast.error(`Error fetching sites: ${error.message}`);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://klokin-backend.vercel.app/api/v1/users");
            setUserList(response.data.users);
        } catch (error) {
            toast.error(`Error fetching users: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchSites();
        fetchUsers();
    }, []);

    return (
        <main className='relative'>
            <Toaster />
            <section className="padding">
                <section className="max-container">
                    <h1>Assign Sites to Data Collectors</h1>
                </section>
            </section>
            <section className="padding">
                <section className="max-container">
                    <form onSubmit={handleAssign} className='flex flex-col gap-6'>
                        <select name="userId" onChange={handleInputChange} value={assignment.userId} className='p-2 border border-gray-400 bg-slate-300 mb-4'>
                            <option value="">Select User</option>
                            {filteredUsers.map(user => (
                                <option key={user._id} value={user._id}>{user.userName}</option>
                            ))}
                        </select>
                        <select name="siteId" onChange={handleInputChange} value={assignment.siteId} className='p-2 border border-gray-400 bg-slate-300 mb-4'>
                            <option value="">Select Site</option>
                            {fetchedSites.map(site => (
                                <option key={site._id} value={site._id}>{site.location}</option>
                            ))}
                        </select>
                        <input name="date" onChange={handleInputChange} value={assignment.date} type="date" className='p-2 bg-slate-300 border border-gray-400'/>
                        <button className='p-2 bg-blue-400 text-white cursor-pointer' type='submit'>Assign</button>
                    </form>
                </section>
                <section className="max-container">
                    <h3>Assigned</h3>
                    {/* Render assigned sites here */}
                </section>
            </section>
        </main>
    );
};

export default AssignPage;
