const express = require("express")
const user = express.Router();


//SIGNIN     username password   {username,user_id}
user.post('/user/login', function(req,res) {
    return res.status(200);
})


//REGISTER   username password   {username,user_id}
user.post('/user/register', function(req,res) {
    return res.status(200);
})


module.exports = user
