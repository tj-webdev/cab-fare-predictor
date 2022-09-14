import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import userAuthStore from '../auth/userAuth';

const initialValues = {
  pickup:'',
  destination: ''
}

const validationSchema = Yup.object().shape({
  pickup: Yup.string().required('Required!'),
  destination: Yup.string().required('Required!')
});


export default function BookingForm() {

  const setAuth = userAuthStore((state)=>state.setAuth);

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = async (formData, onSubmit) => {
    setLoading(true);
    console.log(formData);
    // try{
    //   const request = await axios.post('/booking',
    //     formData,
    //     {withCredentials: true}
    //   );
    //   setLoading(false);
    //   onSubmit.resetForm();
    // }
    // catch(err){
    //   setLoading(false);
    //   if(err.response.data.loggedIn===false){
    //     setAuth({name: undefined, loggedIn: false});
    //   }
    //   else{
    //     setError(err.response.data);
    //   }
    // }
  }

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className='p-4 bg-white shadow rounded'>
          <h4 className='mb-3 fw-bold'>Book a cab</h4>
          <div className="mb-3">
            <label className="form-label">Pickup</label>
            <Field type="text" name='pickup' className="shadow-none form-control" placeholder='From where to pick you...' />
            <ErrorMessage name='pickup' component='div' className='text-danger mt-1' />
          </div>
          <div className="mb-3">
            <label className="form-label">Destination</label>
            <Field type="text" name='destination' className="shadow-none form-control" placeholder='Where to drop you...' />
            <ErrorMessage name='destination' component='div' className='text-danger mt-1' />
          </div>

          {error ? <div className='text-danger mt-3 mb-3'>{error}</div> : null}

          <button type="submit" className="shadow-none btn btn-dark btn-sm" disabled={isLoading}>
            {
              isLoading ? 
              (<><span className='spinner-border spinner-border-sm' role='status'></span> Generating...</>)
              : "SELECT CAB"
            }
          </button>
        </Form>
      </Formik>
    </div>
  )
}
