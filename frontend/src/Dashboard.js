import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const center = {
  lat: 	28.651952,
  lng: 77.231495
};

export default function Dashboard() {

  const [direction, setDirection] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ['places']
  });
  

  if(!isLoaded){
    return (
      <div className="spinner-border text-light position-absolute top-50 start-50" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }
    
  if(isLoaded){
    return(
      <div>
        <div className="container-md mt-3 position-relative">
          <div className="row ">
            <div className="col-lg-4 col-md-6 col-sm-6 px-lg-3 p-0">
              <BookingForm setDirection={setDirection} />
            </div>
            <div className="col-lg-8 p-2 bg-white rounded map-container">
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

}
