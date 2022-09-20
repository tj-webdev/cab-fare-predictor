import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { IoMdLocate } from 'react-icons/io';
import geocode from "react-geocode";

import routeInfoStore from '../store/routeInfoStore';

export default function LocationForm(props) {

  // Form error handling & submit button loading effect
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  
  // Zustand state containing route info - pickup, drop, pickup time, distance & duration 
  const {setDirection, routeInfo, setRouteInfo} = routeInfoStore((state)=>({
    setDirection: state.setDirection,
    routeInfo: state.routeInfo,
    setRouteInfo: state.setRouteInfo
  }));


  // Pickup & drop location handling
  const pickupRef = useRef();
  const dropRef = useRef();
  const pickupTimeRef = useRef();
  

  // Submit location and increment to step 2
  const submitLocation = async () => {
    setLoading(true);
    setError('');
    setDirection(null);
    if(pickupRef.current.value==='' || dropRef.current.value===''){
      setError('Enter both pickup & drop location!');        
    }
    else if(pickupRef.current.value === dropRef.current.value){
      setError('Pickup & drop location cannot be same!');
    }
    else if(pickupTimeRef.current.value===''){
      setError('Enter pickup time!');
    }
    else{
      // Get directions using Directions API
      try{
        const directionsService = new google.maps.DirectionsService(); /* eslint-disable-line */
        const response = await directionsService.route({
          origin: pickupRef.current.value,
          destination: dropRef.current.value,
          unitSystem: google.maps.UnitSystem.METRIC,  /* eslint-disable-line */
          travelMode: google.maps.TravelMode.DRIVING  /* eslint-disable-line */
        });

        const distance = (response.routes[0].legs[0].distance.value/1000).toFixed(2);
        const duration = response.routes[0].legs[0].duration.text;

        setRouteInfo({
          pickup: pickupRef.current.value, 
          drop: dropRef.current.value,
          pickupTime: pickupTimeRef.current.value,
          distance: distance,
          duration: duration,
        });
        setDirection(response);
        props.setStep((prev) => prev+1);
      }
      catch(err){
        setError('Cannot find route!');
      }
    }
    setLoading(false);
  }
  

  // Check location accessibility & get current location
  function checkLocationAccess(){
    setError('');
    if(!navigator.geolocation) {
      setError('Location access failed!');
      return;
    }
    navigator.geolocation.getCurrentPosition(accessCurrentLocation,(error)=>{
      setError('Location access failed!');
    });
  }

  function accessCurrentLocation(position){
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
    geocode.fromLatLng(lat, lng).then((response) => {
      pickupRef.current.value = response.results[0].formatted_address;
    },
    (error) => {
      setError('Location detection failed!');
    });
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h4 className="mb-3 fw-bold">START A RIDE</h4>
      <div className="mb-3">
        <label className="form-label">Pickup Location</label>
        <div className="pickup-input">
          <Autocomplete>
            <input type="text" 
              name="pickup" 
              className="shadow-none form-control"
              placeholder="From where to pick you..."
              defaultValue={routeInfo.pickup}
              ref={pickupRef}
            />
          </Autocomplete>
          <button 
            onClick={checkLocationAccess}
            className="btn p-1 rounded-0 btn-outline-dark ms-1" 
            type="button"
          >
            <IoMdLocate /> <span className='ms-1'>Current Location</span>
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Drop Location</label>
        <Autocomplete>
          <input type="text" 
            name="drop" 
            className="shadow-none form-control" 
            placeholder="Where to drop you..."
            defaultValue={routeInfo.drop}
            ref={dropRef}
          />
        </Autocomplete>
      </div>
      <div className="mb-3">
        <label className="form-label">Pickup Time</label>
        <div className="pickup-input">
        <input type="time" 
          name="pickup" 
          className="shadow-none form-control"
          defaultValue={routeInfo.pickupTime}
          ref={pickupTimeRef}
        />
        </div>
      </div>

      {error ? <div className="text-danger mb-2">{error}</div> : null}

      <button 
        type="button" 
        className="shadow-none mt-1 w-100 btn btn-dark btn-sm" 
        disabled={isLoading}
        onClick={submitLocation}
      >
        {
          isLoading ? 
          (<><span className="spinner-border spinner-border-sm" role="status"></span> Loading...</>)
          : "SELECT CAB"
        }
      </button>
    </div>
  )
}
