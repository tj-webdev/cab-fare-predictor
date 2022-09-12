const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;