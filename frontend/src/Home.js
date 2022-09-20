import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className='container mt-3 mb-4'>
      <div className='row align-items-center'>
        <div className="col-md-6 order-md-0 order-1 text-light mt-3">
          <h1 className='display-5 fw-bold'>Lets Book A Cab For You!</h1>
          <p className='hero-text'>
            This project is created by <b>Mohd Touseef Jamal</b> and it 
            predicts the cab fare with respect to the pickup and drop 
            location and booking time (day/night) of the customer. To develop this application, Google Maps API is used
            along with some other packages, so that routes, distance and duration
            can be shown to the customer.
          </p>
          <Link to='/signup' className='btn btn-light fw-bold d-inline-flex align-items-center'>
            <span className='me-1'>Get Started</span>
            <FiArrowRight /> 
          </Link>
        </div>
        <div className="col-md-6 order-md-0">
          <img src="cab.svg" alt='heroimage' className='img-fluid' />
        </div>
      </div>
    </div>
  )
}
