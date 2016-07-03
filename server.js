var express = require("express");
var path = require("path");
var morgan = require("morgan");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var router = require("./routes.js")(io);
var favicon = require("serve-favicon");

app.set("PORT", 6363);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public/images/favicon.png")))



app.use("/", router);


http.listen(app.get("PORT"), function(){
  console.log("I am listening on PORT: %s", app.get("PORT"));
});
