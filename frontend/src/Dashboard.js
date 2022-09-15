import React from 'react';
import BookingForm from './components/BookingForm';

export default function Dashboard() {

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 mt-5'>
            <BookingForm />
          </div>
        </div>
      </div>

    </div>
  )
}
