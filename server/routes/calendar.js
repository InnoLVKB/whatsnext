const express = require("express")
const calendar = express.Router();


//GOALS    req  = user_id   res = [{date,mood,}]
calendar.post('/calendar', function(req,res) {
    return res.status(200);
})



module.exports = calendar