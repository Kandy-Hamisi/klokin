'use client'

import React, { useState } from 'react'

const SiteDescriptionForm = () => {
    const [ siteDetails, setSiteDetails ] = useState({
        roadName: '',
        description: '',
        geolocation: {
            latitude: 0,
            longitude: 0
        }
    });

    const [ message, setMessage ] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiteDetails({
            ...siteDetails,
            [name]: value
        });
    }

    const handleGeolocation = (e) => {
    e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    if (accuracy <= 100) {

                        setSiteDetails((prevState) => ({
                            ...prevState,
                            geolocation: { latitude: latitude, longitude: longitude},
                        }));
                        setMessage('Geolocation successfully retrieved!');
                        console.log(siteDetails);
                    } else {
                        console.log(accuracy)
                        setMessage('Accuracy is more than 20 meters. Please try again.')
                    }
                },
                (error) => {
                    setMessage('Unable to retrieve your location.');
                    console.error(error);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } //
            );
        } else {
            setMessage('Geolocation is not supported by this browser.');
        }
    }

  return (
    <form className='' onSubmit={handleGeolocation}>
        <div className='mb-4'>
            <label htmlFor="roadName">Enter Site Name</label>
            <input className='p-2 bg-transparent border-gray-500 border' placeholder='Enter Site Name' type="text" onChange={handleInputChange} name="roadName" id="" />
        </div>
        <div className='mb-4'>
            <textarea name="description" className='p-2 bg-transparent border border-gray-500' placeholder='add site description' onChange={handleInputChange} id=""></textarea>
        </div>
        <div className='mb-4'>
            <button className='p-2 bg-blue-400 text-white ' type='submit'>Get geopoint location</button>
        </div>
        <div className='mb-4'>
            { message && <p>{message}</p>}
        </div>
        <div className='mb-4'>
            <p>Latitude: { siteDetails.geolocation.latitude }</p>
            <p>Longitude: { siteDetails.geolocation.longitude }</p>
        </div>
    </form>
  )
}

export default SiteDescriptionForm
