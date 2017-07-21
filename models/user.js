const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  os: {type:String},
  ip: {type: String},
  userAgent: {type: String},
  ver: {type: String},
  screenHeight: {type: Number},
  screenWidth: {type: Number},
  maxScreenWidth: {type: Number},
  maxScreenHeight: {type: Number},  

});

module.exports = mongoose.model("User", userSchema);
