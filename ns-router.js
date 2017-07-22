const express = require("express");
const router = express.Router();
const User = require("./models/user.js");
const Log = require("./models/logentry.js");
const path = require("path");

router.get("/", (req, res) => {
  res.status(200).json({name: "ruinanalytics", lastUpdate: "July 16, 2017"});
});


router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
});

router.get("/testfile", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/views/testfile.html"));
});



router.post("/log", (req, res) => {  
  res.header("Content-type", "application/json; charset=utf-8");
  //TODO:DURATION of VISIT
  //TODO: Validate/Sanitize Text
  //TODO: KeyLOG Event

  const newestLog = new Log({
    os: req.body.os ||"No OS obtained.",
    ip: req.ip || "No ip obtained",
    userAgent: req.headers["user-agent"] || "No browser obtained.",
    ver: req.body.ver || "No Browser verserion retrieved.",
    screenHeight: req.body.screenHeight || "No Screen height retrieved.",
    screenWidth: req.body.screenWidth || "No Screen Width Retrieved",
    maxScreenWidth: req.body.maxWidth || "No Max Screen Width retrieved.",
    maxScreenHeight: req.body.maxHeight || "No Max Screen Height retrieved."
  });

  console.log(req.headers["referrer"]);  
  newestLog.save((err, msg) => {
    if(err){
      console.error(err);
    }else{      
      console.log("Wrtitten to DB");
      res.status(200).send(msg);
    }
  });        
});

module.exports = router;
