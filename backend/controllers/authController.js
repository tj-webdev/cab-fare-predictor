const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

function generateToken(id,name){
  return jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn: "1d"});
}

class authController
{
  static register = async (req,res) => {

    // Check email already exists
    const userExist = await userModel.findOne({email: req.body.email});
    if(userExist){
      return res.status(400).json('Email is already registered!');
    }

    // Encrypt password
    req.body.password = await bcrypt.hash(req.body.password,10);

    // Register new user
    const user = await userModel.create(req.body);

    // Generate token and set in cookies
    const token = generateToken(user._id,user.name);
    res.cookie('jwt',token,{maxAge: 1000*60*60*24, httpOnly: true, sameSite: "none", secure: true});

    res.json({name: user.name, loggedIn: true});
  }

  static login = async (req,res) => {

    // Check email exists
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
      return res.status(400).json("Email is not registered!");
    }

    // Match password
    const passwordMatch = await bcrypt.compare(req.body.password,user.password);
    if(!passwordMatch){
      return res.status(400).json("Incorrect password!");
    }

    // Generate token and set in cookies
    const token = generateToken(user._id,user.name);
    res.cookie('jwt',token,{maxAge: 1000*60*60*24, httpOnly: true, sameSite: 'none', secure: true});

    res.json({name: user.name, loggedIn: true});
  }

  static logout = (req,res) => {
    return res.cookie('jwt',"",{maxAge: 1000, httpOnly: true, sameSite: 'none', secure: true}).send();
  }
}

module.exports = authController;