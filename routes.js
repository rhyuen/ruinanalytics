const express = require("express");
const path = require("path");
const config = require("./config.js");

module.exports = function(io){
  var router = express.Router();

  router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/index.html"));
  });

  router.get("/dashboard", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/dashboard.html"));
  });


  var lifeTimeVisitorData = {};
  var setOfVisitorData = {};

  function computeStats(){
    return {
      pages: computePageCounts(),
      referrers: computeRefererCounts(),
      activeUsers: getActiveUsers()
    };
  }

  function computePageCounts(){
    var pageCounts = {};
    for(var key in setOfVisitorData){
      var page = setOfVisitorData[key].page;
      if(page in pageCounts){
        pageCounts[page]++;
      }else{
        pageCounts[page] = 1;
      }
    }
    return pageCounts;
  }

  function computeRefererCounts(){
    var referrerCounts = {};
    for(var key in setOfVisitorData){
      var referringSite = setOfVisitorData[key].referringSite || "(direct)";
      if(referringSite in referrerCounts){
        referrerCounts[referringSite]++;
      }else{
        referrerCounts[referringSite] = 1
      }
    }
    return referrerCounts;
  }

  function getActiveUsers(){
    return Object.keys(setOfVisitorData).length;
  }


  io.on("connection", function(socket){
    console.log("Connection");

    if(socket.handshake.headers.host == config.host
      && socket.handshake.headers.referer.indexOf(config.host + config.dashboardEndpoint) > -1){
        io.emit("updated-stats", computeStats());
      }

    socket.on("visitor-data", function(userData){
      setOfVisitorData[socket.id] = userData;
      // console.log(userData);
      // console.log(setOfVisitorData);
      io.emit("updated-stats", computeStats());
    });

    socket.on("disconnect", function(){
      //console.log("Disconnection");
      delete setOfVisitorData[socket.id];
      io.emit("updated-stats", computeStats());
    });
  });

  return router;
};
