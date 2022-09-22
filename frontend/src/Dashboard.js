import React from 'react';
import BookingForm from './components/BookingForm';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import routeInfoStore from './store/routeInfoStore';

const center = {
  lat: 	28.651952,
  lng: 77.231495
};

const libraries = ['places'];

export default function Dashboard() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: libraries
  });

  // Zustand state containing route info - direction
  const direction = routeInfoStore((state) => state.direction);

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
            <div className="col-lg-4 col-md-6 px-lg-3 p-0">
              <BookingForm />
            </div>
            <div className="col-lg-8 p-2 bg-white rounded map-container">
              <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={6}
              >
                { direction && <DirectionsRenderer options={{directions: direction}} /> }
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
