import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userAuthStore from "./store/authStore";
import {useNavigate} from "react-router-dom";

const axios = require("axios");


const initialValues = {
  name: '',
  email: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .required('Name is required!'),

  email: Yup.string()
    .required('Email is required!')
    .email('Invalid email!'),

  password: Yup.string()
    .required('Password is required!')
    .min(6,'Minium password length is 6 characters')
});


export default function Singup() {

  const setAuth = userAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = async (formData) => {
    setLoading(true);
    try{
      const request = await axios.post('/auth/register',
        formData,
        {withCredentials: true}
      );
      const data = request.data;
      setAuth(data);
      navigate('/dashboard',{replace: true});
    }
    catch(err){
      setLoading(false);
      setError(err.response.data);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mt-5 mx-auto">
            <Formik 
              initialValues={initialValues} 
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="p-4 bg-white shadow rounded-3">
                <h1 className="mb-4 fw-bold org-color">Sign Up</h1>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <Field type="text" name="name" className="form-control shadow-none" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field type="text" name="email" className="form-control shadow-none" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Field type="password" name="password" className="form-control shadow-none" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                {error ? <div className="text-danger mb-3">{error}</div> : null}

                <button 
                  type="submit" 
                  className="btn custom-btn mt-1 mb-1"
                  disabled={isLoading}
                >
                  { 
                    isLoading ? <>
                      <span className="spinner-border spinner-border-sm" role="status"></span> Loading...
                    </>
                    : "SIGN UP"
                  }
                </button>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </div>
  )
}
