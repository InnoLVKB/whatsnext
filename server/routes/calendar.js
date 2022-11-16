const express = require("express");
const CalendarControllers = require("../controllers/calendar.js");
const calendar = express.Router();


//GOALS    req  = user_id   res = [{date,mood, ....}]
calendar.post('/',
    CalendarControllers.getCalendar,
    function(req,res) {
    return res.status(200).json(res.locals.calendar);
})



module.exports = calendar