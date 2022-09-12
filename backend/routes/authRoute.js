const express = require('express');
const authController = require('../controllers/authController');

// check user is logged in or not middleware
const { isLoggedIn } = require('../middlewares/userAuth');

// data validation schema and middlewares
const {loginSchema, registerSchema, validator} = require('../middlewares/userValidator');

const router = express.Router();

router
  .post('/login', validator(loginSchema), authController.login)
  .post('/register', validator(registerSchema), authController.register)
  .get('/logout', authController.logout)
  .get('/isloggedin', isLoggedIn);


module.exports = router;