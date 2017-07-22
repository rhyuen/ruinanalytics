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

app.set("trust proxy", true);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public/images/favicon.png")))

app.use("/", nsrouter);
app.use("/sock", router);

module.exports = http;
