import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import bookingStore from './store/routeInfoStore';

const center = {
  lat: 	28.651952,
  lng: 77.231495
};

export default function Dashboard() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ['places']
  });
  
  const [direction, setDirection] = useState(null);

  return (!isLoaded) ? <>Loading</> : (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 mt-5'>
            <BookingForm setDirection={setDirection} />
          </div>
          <div className='col-md-8 mt-5 p-2 bg-white rounded'>
            <GoogleMap
              mapContainerClassName="google-map"
              center={center}
              zoom={6}
            >
              { direction && <DirectionsRenderer directions={direction} /> }
            </GoogleMap>
          </div>
        </div>
      </div>

    </div>
  )

}
