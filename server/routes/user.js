const express = require("express");
const user = express.Router();
const UserControllers = require("../controllers/user.js");

//SIGNIN     username password    res = {username,user_id}
user.post("/login", UserControllers.login, function (req, res) {
  return res.status(200).json({
    message: "User logged in",
    username: res.locals.username,
    user_id: res.locals.user_id,
  });
});

//REGISTER   username password   res = {username,user_id}
user.post("/register", UserControllers.register, function (req, res) {
  return res.status(200).json({
    message: "User created",
    username: res.locals.username,
    user_id: res.locals.user_id,
  });
});

module.exports = user;
