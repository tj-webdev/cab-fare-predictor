import React from 'react';

export default function Home() {
  return (
    <div className='container mt-5'>
      <div className='row align-items-center'>
        <div className="col-md-6 order-md-0 order-1">
          <h1 className='fw-bold'>Lets Book A Cab For You!</h1>
          <h4 className='fw-bold dark-blue-color'>Keep track of your links from one place.</h4>
          <p className='fw-bold'>
            Do your registration and use the powerful URL shortener built with tools that will
            help you grow and protect your brand.
            Place all your necessary links in one location and keep tracking their results.
            Get a dashboard and know from which social platform your links are generating traffic.
          </p>
        </div>
        <div className="col-md-6 order-md-0">
          <img src="heroImg.png" alt='heroimage' className='img-fluid' />
        </div>
      </div>
    </div>
  )
}
