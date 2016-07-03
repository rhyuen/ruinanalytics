var express = require("express");
var path = require("path");

module.exports = function(io){
  var router = express.Router();

  router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/index.html"));
  });



  var lifeTimeVisitorData = {};
  var setOfVisitorData = {};


  io.on("connection", function(socket){
    console.log("Connection");

    socket.on("visitor-data", function(userData){
      setOfVisitorData[socket.id] = userData;
      console.log(userData);
      console.log(setOfVisitorData);
    });

    socket.on("disconnect", function(){
      console.log("Disconnection");
      delete setOfVisitorData[socket.id];
    });
  });

  return router;
};
