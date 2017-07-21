"use strict";

const server = require("./server.js");
const mongoose = require("mongoose");
const config = require("./config.js");
const PORT = 9786;

process.on("UncaughtError", (err) => {
    if(err){        
        console.log("UNCAUGHT ERROR %s", err);
    }else{
        console.log("Uncaught error.");
    }
});

mongoose.connect(config[process.env.NODE_ENV].db, (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("DB CONN success.");
    }
});

server.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port %s.", PORT);
    }    
});