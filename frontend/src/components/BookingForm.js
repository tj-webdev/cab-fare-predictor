import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Lottie from "lottie-react";
import bookingStore from '../store/bookingStore';
import cabList from '../store/cabList';
import { IoIosArrowBack } from 'react-icons/io';

function isDayOrNight(){
  let hours = new Date().getHours();
  return (hours > 6 && hours < 20) ? true : false;
}


export default function BookingForm() {

  const isDayTime = isDayOrNight();
  const [step,setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const {bookingData,setPickDest} = bookingStore((state)=>({
    bookingData: state.bookingData, 
    setPickDest: state.setPickDest
  }));
  
  // Step 1 form - pickup & drop direction

  const stepOneInitial = {
    pickup: bookingData.pickup,
    drop: bookingData.drop
  }

  const stepOneValidation = Yup.object().shape({
    pickup: Yup.string().required('Required!'),
    drop: Yup.string().required('Required!')
  });

  const stepOneSubmit = async (formData) => {
    setLoading(true);
    try{
      setLoading(false);
      setPickDest(formData);
      setStep((prev) => prev+1);
    }
    catch(err){
      setLoading(false);
      // setError('Invalid location!');
    }
  }

  // Step 1 form - END


  // Step 2 form - select a cab

  const stepTwoInitial = {
    cabid: '1'
  }

  const stepTwoValidation = Yup.object().shape({
    cabid: Yup.string().required('Please select a cab!')
  });

  const stepTwoSubmit = async (formData) => {
    setLoading(true);
    try{
      setLoading(false);
      console.log(formData)
      // setBooking(formData);
      // setStep((prev) => prev+1);
    }
    catch(err){
      setLoading(false);
      // setError('Invalid location!');
    }
  }

  // Step 2 form - END

  // const [error, setError] = useState(null);

  return (
    <div>
      {
        step===1 && <>
          <Formik 
            initialValues={stepOneInitial} 
            validationSchema={stepOneValidation} 
            onSubmit={stepOneSubmit}
          >
            <Form className="p-4 bg-white shadow rounded">
              <h4 className="mb-3 fw-bold">ENTER LOCATION</h4>
              <div className="mb-3">
                <label className="form-label">Pickup</label>
                <Field type="text" name="pickup" className="shadow-none form-control" placeholder="From where to pick you..." />
                <ErrorMessage name="pickup" component="div" className="text-danger mt-1" />
              </div>
              <div className="mb-4">
                <label className="form-label">Drop</label>
                <Field type="text" name="drop" className="shadow-none form-control" placeholder="Where to drop you..." />
                <ErrorMessage name="drop" component="div" className="text-danger mt-1" />
              </div>

              {/* {error ? <div className="text-danger mt-3 mb-3">{error}</div> : null} */}

              <button type="submit" className="shadow-none w-100 btn btn-dark btn-sm" disabled={isLoading}>
                {
                  isLoading ? 
                  (<><span className="spinner-border spinner-border-sm" role="status"></span> Loading...</>)
                  : "SELECT CAB"
                }
              </button>
            </Form>
          </Formik>
        </>
      }
      {
        step===2 && <>
          <Formik 
            initialValues={stepTwoInitial} 
            validationSchema={stepTwoValidation} 
            onSubmit={stepTwoSubmit}
          >
            <Form className="p-4 bg-white shadow rounded">
              <h4 className="mb-3 fw-bold d-flex align-items-center justify-content-between">
                <span className='mt-1'>SELECT CAB</span>
                <button onClick={() => setStep((prev) => prev-1)} className="btn fw-bold px-2">
                  <IoIosArrowBack className='fs-4' />
                </button>
              </h4>
              <div className="mb-3">
                <label>Distance:</label> 11.11 KM
                <br />
                <label>Estimated Time:</label> 12 Min.
              </div>

              <div className="mb-4">
                {
                  cabList.map((cab,i)=>{
                    return (
                      <label key={i} className='cab-list mb-3'>
                        <Field type="radio" name="cabid" value={String(cab.id)} />
                        <div className="cab-data d-flex align-items-center border rounded-3 py-2 px-3">
                          <div className="lottie-img w-50 me-3">
                            {<Lottie animationData={cab.img} />}
                          </div>
                          <span className='d-flex justify-content-between align-items-center w-100'>
                            <span className="text-secondary">{cab.name}</span>
                            <h6 className="fw-bold mb-0">
                              Rs.{ (!isDayTime) ? cab.nPrice : cab.mPrice }
                            </h6>
                          </span>
                        </div>
                      </label>
                    )
                  })
                }
              </div>

              <ErrorMessage name="cabid" component="div" className="text-danger mt-1" />

              {/* {error ? <div className="text-danger mt-3 mb-3">{error}</div> : null} */}

              <button type="submit" className="shadow-none w-100 btn btn-dark btn-sm" disabled={isLoading}>
                {
                  isLoading ? 
                  (<><span className="spinner-border spinner-border-sm" role="status"></span> Generating...</>)
                  : "BOOK"
                }
              </button>
            </Form>
          </Formik> 
        </>
      }
    </div>
  )
}
