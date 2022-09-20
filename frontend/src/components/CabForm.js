import React, { useState } from 'react';
import Lottie from "lottie-react";
import cabList from '../store/cabList';
import routeInfoStore from '../store/routeInfoStore';
import { IoIosArrowBack } from 'react-icons/io';
import {Formik, Form, Field} from 'formik';


export default function CabForm(props) {

  const [isLoading, setLoading] = useState(false);

  // Zustand state containing route info - pickup, drop, pickup time, distance, duration & direction
  const {routeInfo, setDirection} = routeInfoStore((state)=>({
    routeInfo: state.routeInfo,
    setDirection: state.setDirection
  }));


  // Check whether it is day or night 
  // From 5:00 AM to 7:59 PM == Day | else == Night
  function isDayOrNight(){
    let hours = Number(routeInfo.pickupTime.split(':')[0]);
    return (hours >= 5 && hours < 20) ? true : false;
  }
  const isDayTime = isDayOrNight();


  // Submit booking
  const submitBooking = (formData) => {
    // store ref data and cabId in db (future upgrades)
    setLoading(true);
    props.setStep((prev)=>prev+1);
  }


  // Go to Step 1
  function goToStep1(){
    props.setStep((prev) => prev-1);
    setDirection(null);
  }


  return (
    <Formik initialValues={{cabid: '1'}} onSubmit={submitBooking}>
      <Form>
        <div className="p-4 bg-white shadow rounded">
          <h4 className="mb-3 fw-bold d-flex align-items-center justify-content-between">
            <span className='mt-1'>SELECT CAB</span>
            <button type="button" onClick={goToStep1} className="btn fw-bold px-2">
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
                    <Field type="radio" name="cabid" value={String(cab.id)} />
                    <div className="cab-data d-flex align-items-center border border-2 rounded-3 py-2 px-3">
                      <div className="lottie-img w-50 me-3">
                        {<Lottie animationData={cab.img} />}
                      </div>
                      <div className='d-flex justify-content-between align-items-center w-100'>
                        <div className="text-secondary">
                          {cab.name} 
                          <div className='small'>
                            &#8377;{bPrice} / Km
                            <br />
                            {cab.passenger}
                          </div>
                        </div>
                        <h6 className="fw-bold mb-0 text-primary">
                          &#8377;{ Math.floor(bPrice * routeInfo.distance) }
                        </h6>
                      </div>
                    </div>
                  </label>
                )
              })
            }
          </div>

          <button 
            type="submit" 
            className="shadow-none w-100 btn btn-dark btn-sm" 
            disabled={isLoading}
            onClick={submitBooking}
          >
            {
              isLoading ? 
              (<><span className="spinner-border spinner-border-sm" role="status"></span> Loading...</>)
              : "BOOK"
            }
          </button>
        </div>
      </Form>
    </Formik>
  )
}
