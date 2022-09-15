import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bookingStore from '../store/bookingStore';
import cabStore from '../store/cabStore';

export default function BookingForm() {

  const [step,setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const cabList = cabStore((state) => state.cabList);

  const {bookingData,setBooking} = bookingStore((state)=>({
    bookingData: state.bookingData, 
    setBooking: state.setBooking
  }));
  
  // Step 1 form - pickup & destination direction

  const stepOneInitial = {
    pickup: bookingData.pickup,
    destination: bookingData.destination
  }

  const stepOneValidation = Yup.object().shape({
    pickup: Yup.string().required('Required!'),
    destination: Yup.string().required('Required!')
  });

  const stepOneSubmit = async (formData) => {
    setLoading(true);
    try{
      setLoading(false);
      setBooking(formData);
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
    cabid: Yup.number().required('Please select a cab!')
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
              <h4 className="mb-3 fw-bold">Book a cab</h4>
              <div className="mb-3">
                <label className="form-label">Pickup</label>
                <Field type="text" name="pickup" className="shadow-none form-control" placeholder="From where to pick you..." />
                <ErrorMessage name="pickup" component="div" className="text-danger mt-1" />
              </div>
              <div className="mb-4">
                <label className="form-label">Destination</label>
                <Field type="text" name="destination" className="shadow-none form-control" placeholder="Where to drop you..." />
                <ErrorMessage name="destination" component="div" className="text-danger mt-1" />
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
                <span>Select a cab</span>
                <button onClick={() => setStep((prev) => prev-1)} className="btn btn-light fw-bold">&lt;</button>
              </h4>
              <div className="mb-3">
                <label>Distance:</label> 11.11 KM
                <br />
                <label>Estimated Time:</label> 12 Min.
              </div>

              <div className="mb-4">
                {/* {
                  cabList.map((cab,i)=>{
                    return (
                      <label key={i}>
                        <Field type="radio" name="cabid" value={cab.id} />
                        <div>
                          {cab.img}
                          {cab.name}
                        </div>
                      </label>
                    )
                  })
                } */}
                {/* <label>
                  <Field type="radio" name="cabid" value="1" />
                  One
                </label>
                <label>
                  <Field type="radio" name="cabid" value="2" />
                  Two
                </label> */}
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
