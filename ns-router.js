const express = require("express");
const router = express.Router();
const User = require("./models/user.js");
const Log = require("./models/logentry.js");
const path = require("path");
const serveStatic = require("serve-static");

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
    ip: req.ips|| "No ip obtained",
    userAgent: req.headers["user-agent"] || "No browser obtained.",
    ver: req.body.ver || "No Browser verserion retrieved.",
    screenHeight: req.body.screenHeight || "No Screen height retrieved.",
    screenWidth: req.body.screenWidth || "No Screen Width Retrieved",
    maxScreenWidth: req.body.maxWidth || "No Max Screen Width retrieved.",
    maxScreenHeight: req.body.maxHeight || "No Max Screen Height retrieved.",
    eventLog: []
  });
    
  newestLog.save((err, msg) => {
    if(err){
      console.error(err);
    }else{            
      console.log("LOGGED RESULT %s", msg._id);
      res.status(200).json({_id: msg._id, desc: "Log token for user."});
    }
  });        
});

router.put("/log/:id", (req, res) => {
  console.log("PARAM %s", req.params.id);
  console.log("BODY %s", req.body.data);
  Log.findOneAndUpdate({_id: req.params.id}, {$set: {eventLog: req.body.data}}, (err, item) => {
    if(err){
      console.error(err);
    }else{
      console.log("Update success %s", item);
      res.status(200).json({desc: "Update success.", body: item});
    }
  });
});

module.exports = router;
