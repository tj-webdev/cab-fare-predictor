import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <div  className='text-center'>
      <h4 className='mt-5 mb-3 fw-bold'>Page not found!</h4>
      <Link to="/" className="btn btn-info text-light btn-sm mb-4">Go To Home</Link>
    </div>
  )
}
