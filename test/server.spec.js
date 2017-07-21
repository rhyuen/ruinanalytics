"use strict";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server.js");
const config = require("../config.js");

chaiHttp.use(server);

describe("Server", () => {
    it("GET request works", (done) => {
        
    });

    it("POST request works", (done) => {

    });
});
