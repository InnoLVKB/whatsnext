const express = require("express")
const goals = express.Router();


//GOALS    date, user_id   res = {username,user_id}
goals.post('/goals/:date', function(req,res) {
    return res.status(200);
})


//GOALS NEW  name, description, date,
// status (true by default?), user_id   res = {username,user_id}
goals.post('/goals/new', function(req,res) {
    return res.status(200);
})

//GOAL UPDATE    req: id,user_id, new entry   res: {id,name,description,date,status,user_id}
goals.patch('/goals/:id', function(req,res) {
    return res.status(200);
})

//GOALS DELETE    req: id, user_id
goals.post('/goals/:id', function(req,res) {
    return res.status(200).send("Successfully deleted goal.");
})


module.exports = goals