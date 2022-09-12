const yup = require('yup');

// register validation schema

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup.string().email('Invalid email!').required('Email is required!'),
  password: yup.string().min(6)
    .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})','Enter a strong password!')
    .required('Password is required!')
});

// login validation schema

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email!').required('Email is required!'),
  password: yup.string().required('Password is required!')
})

// Validator middlewares

const validator = (schema) => async (req,res,next) => {
  try{
    await schema.validate(req.body);
    next();
  }
  catch(err){
    res.status(400).json(err.errors[0])
  }
}

module.exports = {loginSchema, registerSchema, validator};
