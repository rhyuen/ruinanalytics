"use strict";

const server = require("./server.js");
const PORT = process.env.NODE_ENV || 9786;

process.on("UncaughtError", (err) => {
    if(err){
        //do stuff.
        console.log(err);
    }else{
        console.log("Uncaught error.");
    }
});

server.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port %s." PORT);
    }    
});