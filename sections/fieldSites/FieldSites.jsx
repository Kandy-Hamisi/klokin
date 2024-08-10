'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FieldSites = () => {
  const [selectedSite, setSelectedSite] = useState('');
  const [message, setMessage] = useState('');
  const [roadSites, setRoadSites] = useState([]);

  const fetchSites = async () => {
    try {
      const response = await axios.get('https://klokin-backend.vercel.app/api/v1/sites');
      const siteData = response.data.sites;
      setRoadSites(siteData);
    } catch (error) {
      console.error('Error fetching the sites:', error);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleClockIn = () => {
    if (selectedSite === '') {
      setMessage('Please select a site before clocking in.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const selectedRoadSite = roadSites.find(site => site.location === selectedSite);
        const { latitude: siteLat, longitude: siteLon } = selectedRoadSite.gps; // Use gps property

        const distance = getDistanceFromLatLonInKm(latitude, longitude, siteLat, siteLon);

        if (distance < 0.1) {
          setMessage(`Clocked in successfully at ${selectedSite} at ${new Date().toLocaleString()}.`);
        } else {
          console.log({
            latitude: latitude,
            longitude: longitude,
            distance: distance,
            selectedSite: selectedSite,
            selectedRoadSite: selectedRoadSite,
            message: message,
          })
          setMessage(`You are too far from ${selectedSite} to clock in. Please move closer and try again.`);
        }

      }, () => {
        setMessage('Unable to retrieve your location.');
      });
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <section className='max-container'>
      <form action="">
        <div>
          <h4 htmlFor='sites' className='font-montserrat font-bold text-xl mb-4'>Select The Data Collection Site</h4>
          <div className='font-montserrat'>
            {roadSites.map((site, index) => (
              <div key={index} className='flex space-x-4 mb-4'>
                <input
                  type="radio"
                  name="sites"
                  id={site.location}
                  value={site.location}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className=''
                />
                <label htmlFor={site.location}>{site.location}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            type='button'
            className='p-2 bg-blue-primary text-white rounded-md font-montserrat w-full'
            onClick={handleClockIn}
          >
            Clock In
          </button>
        </div>
      </form>
      {message !== '' && (
        <div className='text-center'>
          <p className='font-bold font-montserrat'>{message}</p>
        </div>
      )}
    </section>
  );
};

export default FieldSites;
