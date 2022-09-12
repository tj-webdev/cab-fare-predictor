const jwt = require('jsonwebtoken');

// verify JWT token from cookies
const userLogin = (req,res,next) => {
  
  // Access token from cookies
  const token = req.cookies.jwt;
  if(!token){
    return res.status(400).json({loggedIn: false, errMsg:"Token not found!"});
  }

  // Verify token
  jwt.verify(token,process.env.JWT_SECRET,(err,payload)=> {
    if(err){
      return res.status(400).json({loggedIn: false, errMsg:"Invalid token!"});
    }
    else{
      // Retrieve user id from token and pass in request body
      req.body.userId = payload.id;
      next();
    }
  });
}

// verify JWT token from cookies & return true to react
const isLoggedIn = (req,res) => {
  
  // Access token from cookies
  const token = req.cookies.jwt;
  if(!token){
    return res.json({name: undefined, loggedIn: false});
  }

  // Verify token
  jwt.verify(token,process.env.JWT_SECRET,(err,payload)=> {
    if(err){
      return res.json({name: undefined, loggedIn: false});
    }
    else{
      return res.json({name: payload.name, loggedIn: true});
    }
  });
}

module.exports = {userLogin, isLoggedIn};