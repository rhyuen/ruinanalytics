const mongoose = require("mongoose");

const logEntrySchema = mongoose.Schema({
  ip: {type: String},
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

module.exports = mongoose.model("LogEntry", logEntrySchema);
