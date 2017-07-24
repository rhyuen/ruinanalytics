const mongoose = require("mongoose");

const logEntrySchema = mongoose.Schema({
  os: {type:String},
  ip: {type: String},
  userAgent: {type: String},
  ver: {type: String},
  screenHeight: {type: Number},
  screenWidth: {type: Number},
  maxScreenWidth: {type: Number},
  maxScreenHeight: {type: Number},
  eventLog: {type: Array, default: []}
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

module.exports = mongoose.model("LogEntry", logEntrySchema);
