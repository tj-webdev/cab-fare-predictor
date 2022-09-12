require('dotenv').config();

PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
const express = require('express');
const dbConnect = require('./mongodb');
const cors = require('cors');

// Express app setup & configurations
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_DOMAIN,
  credentials: true
}))


// connect database 
dbConnect();

// include & use routes
const authRoute = require('./routes/authRoute');

app.use('/auth',authRoute);

app.listen(PORT);