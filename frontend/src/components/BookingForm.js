import React, { useState } from 'react';
import routeInfoStore from '../store/routeInfoStore';
import LocationForm from './LocationForm';
import CabForm from './CabForm';

export default function BookingForm(props) {

  // Step handling
  const [step,setStep] = useState(1);

  // Zustand state containing route info - pickup, drop, pickup time, distance & duration 
  const {setDirection, setRouteInfo} = routeInfoStore((state)=>({
    setDirection: state.setDirection,
    setRouteInfo: state.setRouteInfo
  }));


  // Reset all data and go home (Step 1)
  const goToHome = () => {
    setStep(1);
    setRouteInfo({pickup: '', drop: '', pickupTime: '', distance: '', duration: ''});
    setDirection(null);
  }

  return (
    <div>
      {
        step===1 && <LocationForm setStep={setStep} /> 
      }
      {
        step===2 && <CabForm setStep={setStep} />
      }
      {
        step===3 && <>
          <div className="p-4 bg-white shadow rounded text-center">
            <h4 className="mb-3 fw-bold">Booking done!</h4>
            <button onClick={goToHome} className='btn btn-dark fw-bold'>
              Go to Home
            </button>
          </div>
        </>
      }
    </div>
  )
}
