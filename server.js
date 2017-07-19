const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const router = require("./routes.js")(io);
const favicon = require("serve-favicon");
const nsrouter = require("./ns-router.js");

app.set("PORT", process.env.PORT || 6363);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public/images/favicon.png")))


app.use("/", router);
app.use("/ns", nsrouter);


http.listen(app.get("PORT"), (err) => {
  if(err)
    console.error("[%s] ERROR: %s", err);
  else
    console.log("[%s] I am listening on PORT: %s", new Date().toLocaleString(), app.get("PORT"));
});
