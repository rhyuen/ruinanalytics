const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ip: {type: String},
  
});

module.exports = mongoose.model("User", userSchema);
