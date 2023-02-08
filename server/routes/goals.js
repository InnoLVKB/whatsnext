// const express = require("express");
// const goals = express.Router();
// const GoalsControllers = require("../controllers/goals.js");

// //GET GOALS    date, user_id   res = {username,user_id}
// goals.post('/date',
//     GoalsControllers.getGoals,
//     function(req,res) {
//     return res.status(200).json(res.locals.goals);
// })

// // GOALS NEW  name, description, date,
// // status (true by default?), user_id   res = {username,user_id}
// goals.post('/new',
//     GoalsControllers.postGoal,
//     function(req,res) {
//         return res.status(200).json(res.locals.goals);
// })

// //GOAL UPDATE    req: id,user_id, new entry   res: {id,name,description,date,status,user_id}
// goals.patch("/:id", GoalsControllers.updateGoal, function (req, res) {
// 	return res.status(200).json(res.locals.goals);
// });

// //GOALS DELETE    req: id, user_id
// goals.post("/:id", GoalsControllers.deleteGoal, function (req, res) {
// 	return res.status(200).send("Successfully deleted goal.");
// });

// module.exports = goals;
