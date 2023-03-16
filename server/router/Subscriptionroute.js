const route = require("express").Router();
const {
  Subscribe,
  SubscribeUser,
} = require("../controller/Subscription");

route.post("/subscribe", Subscribe);

route.post("/subscribeuser", SubscribeUser);

module.exports = route;
