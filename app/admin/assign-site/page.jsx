'use client'

import { sites, users } from '@/constants';
import React, { useState } from 'react'

const AssignPage = () => {
    
    const [ selectedUser, setSelectedUser ] = useState('');
    const [ selectedSite, setSelectedSite ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState('');

    const handleAssign = () => {
        if (selectedUser && selectedSite && selectedDate) {
            const assignment = {
                userId: selectedUser,
                siteId: selectedSite,
                date: selectedDate,
            };

            console.log('Assignment: ', assignment);
        } else {
            alert('Please select a user, site and date');
        }
    }

  return (
    <main className='relative'>
      <section className="padding">
        <section className="max-container">
            <h1>Assign Sites to Data collectors</h1>
        </section>
      </section>
      <section className="padding">
        <section className="max-container">
            <select className='p-2 border border-gray-400 bg-slate-300 mb-4' value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="" disabled>Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <select className='p-2 border border-gray-400 bg-slate-300 mb-4' value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
                <option value="" disabled>Select Site</option>
                {sites.map(site => (
                    <option key={site.id} value={site.id}>{site.roadName}</option>
                ))}
            </select>
            <input type="date" className='p-2 bg-slate-300 border border-gray-400' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <button className='ml-2 p-2 bg-blue-400 text-white cursor-pointer' onClick={handleAssign}>Assign</button>
        </section>
        <section className="max-container">
            <h3>Assigned </h3>
        </section>
      </section>
    </main>
  )
}

export default AssignPage
