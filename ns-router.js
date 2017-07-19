const express = require("express");
const router = express.Router();
const User = require("./models/user.js");

router.get("/", (req, res) => {
  res.status(200).json({name: "ruinanalytics", lastUpdate: "July 16, 2017"});
});


router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
});



router.post("/log", (req, res) => {
  //
  //IP
  //VISITING SITE
  //TIME and DATE, LIST OF TIME AND DATES
  const latest = new User();
  req.body.ip || "None Detected";
  req.body.useragent || "None Detected";
});

module.exports = router;
