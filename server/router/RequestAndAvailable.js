const route = require("express").Router();
const {
  RequetsUsers,
  AvailableDoctor
} = require("../controller/RequestAndAvailable");

route.post("/available/doctor", AvailableDoctor);

route.post("/request/user", RequetsUsers);

module.exports = route;
