import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <div  className='text-center'>
      <h3 className='mt-5 mb-3 fw-bold'>Page not found!</h3>
      <Link to="/" className="btn btn-dark fw-bold btn-sm mb-4">Go To Home</Link>
    </div>
  )
}
