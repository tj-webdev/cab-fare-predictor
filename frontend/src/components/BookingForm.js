import React, { useRef, useState } from 'react';
import Lottie from "lottie-react";
import cabList from '../store/cabList';
import routeInfoStore from '../store/routeInfoStore';
import { IoIosArrowBack, IoMdLocate } from 'react-icons/io';
import { Autocomplete } from '@react-google-maps/api';
import geocode from "react-geocode";


// Check whether it is day or night
function isDayOrNight(){
  let hours = new Date().getHours();
  return (hours > 6 && hours < 20) ? true : false;
}

export default function BookingForm(props) {

  const isDayTime = isDayOrNight();
  const [step,setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const {routeInfo, setRouteInfo} = routeInfoStore((state)=>({
    routeInfo: state.routeInfo,
    setRouteInfo: state.setRouteInfo,
  }));

  // Pickup & drop location handling

  const pickupRef = useRef();
  const dropRef = useRef();

  const submitLocation = async () => {
    setLoading(true);
    setError('');
    if(pickupRef.current.value==='' || dropRef.current.value===''){
      setError('Enter pickup & drop location!');        
    }
    else if(pickupRef.current.value === dropRef.current.value){
      setError('Pickup & drop location cannot be same!');
    }
    else{
      // Get directions using Directions API
      try{
        const directionsService = new google.maps.DirectionsService(); /* eslint-disable-line */
        const response = await directionsService.route({
          origin: pickupRef.current.value,
          destination: dropRef.current.value,
          travelMode: google.maps.TravelMode.DRIVING  /* eslint-disable-line */
        });

        const distance = (response.routes[0].legs[0].distance.value/1000).toFixed(2);
        const duration = response.routes[0].legs[0].duration.text;

        setRouteInfo({
          pickup: pickupRef.current.value, 
          drop: dropRef.current.value,
          distance: distance,
          duration: duration,
        });
        props.setDirection(response);
        setStep((prev) => prev+1);
      }
      catch(err){
        props.setDirection(null);
        setError('Cannot find route!');
      }
    }
    setLoading(false);
  }

  // Get current location

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

  // Select cab and do booking

  const cabid = useRef();


  // const book = async () => {
  //   setLoading(true);
  //   try{
  //     setLoading(false);
      // setBooking(formData);
      // setStep((prev) => prev+1);
  //   }
  //   catch(err){
  //     setLoading(false);
      // setError('Invalid location!');
  //   }
  // }



  return (
    <div>
      {
        step===1 && <>
          <div className="p-4 bg-white shadow rounded">
            <h4 className="mb-3 fw-bold">ENTER LOCATION</h4>
            <div className="mb-3">
              <label className="form-label">Pickup</label>
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
              <label className="form-label">Drop</label>
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
        </>
      }
      {
        step===2 && <>
          <div className="p-4 bg-white shadow rounded">
            <h4 className="mb-3 fw-bold d-flex align-items-center justify-content-between">
              <span className='mt-1'>SELECT CAB</span>
              <button onClick={()=>setStep((prev) => prev-1)} className="btn fw-bold px-2">
                <IoIosArrowBack className='fs-4' />
              </button>
            </h4>
            <div className="mb-3">
              <label>Distance:</label> {routeInfo.distance} Km
              <br />
              <label>Estimated Time:</label> {routeInfo.duration}
            </div>

            <div className="mb-4">
              {
                cabList.map((cab,i)=>{
                  const bPrice = (!isDayTime) ? cab.nPrice : cab.mPrice;
                  return (
                    <label key={i} className='cab-list mb-3'>
                      <input type="radio" name="cabid" value={String(cab.id)} ref={cabid} />
                      <div className="cab-data d-flex align-items-center border rounded-3 py-2 px-3">
                        <div className="lottie-img w-50 me-3">
                          {<Lottie animationData={cab.img} />}
                        </div>
                        <span className='d-flex justify-content-between align-items-center w-100'>
                          <span className="text-secondary">
                            {cab.name} 
                            <br />
                            &#8377;{bPrice} / Km
                          </span>
                          <h6 className="fw-bold mb-0">
                            &#8377;{ Math.floor(bPrice * routeInfo.distance) }
                          </h6>
                        </span>
                      </div>
                    </label>
                  )
                })
              }
            </div>

            {error ? <div className="text-danger mt-3 mb-3">{error}</div> : null}

            <button type="button" className="shadow-none w-100 btn btn-dark btn-sm" disabled={isLoading}>
              {
                isLoading ? 
                (<><span className="spinner-border spinner-border-sm" role="status"></span> Generating...</>)
                : "BOOK"
              }
            </button>
          </div>
        </>
      }
    </div>
  )
}
