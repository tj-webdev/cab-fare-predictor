# Cab Fare Predictor

It is a web app built on MERN stack. It predicts the cost of the ride based on user's pickup and drop location along with pickup timing(morning or night). 

The project's frontend and backend are built separately so that more features can be added easily in future.

## Features

1. JWT based authentication system.
2. Google map that shows path (from pickup to drop location)
3. Select current location as pickup location
4. Enter desired pickup timing
5. Distance and estimated time of drop between two locations
6. Cab list with predicted price based on distance and time of the day (morning/night)

## Technologies & Packages

Backend - Node, Express, Yup, Mongoose, Bcrypt, cors, cookie-parser

Frontend - React, Formik, Yup, Axios, Zustand, React Router, lottie-react, geocoder, react-google-maps/api (package)

## Environment Variables

To run this project, you need to create env file in frontend and backend folder.
Variables that you need to create: 

Backend: `DB_URL`, `JWT_SECRET`, `CORS_DOMAIN`

Frontend: `REACT_APP_BACKEND_URL`, `REACT_APP_MAP_API_KEY`
