"use strict";

const nconf = require("nconf");
nconf.file("./keys.json");

module.exports = {
  host: "localhost:6363",
  dashboardEndpoint: "/dashboard",
  development: {
    db: process.env.db || nconf.get("dev:db")
  },
  production: {
    db: process.env.db|| nconf.get("production:db")
  }
};
