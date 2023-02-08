// const user = require("../routes/user.js");
// const db = require("../models/models.js");

// const GoalsControllers = {
// 	getGoals: (req, res, next) => {
// 	  const { date, user_id } = req.body;
// 	  const query = 'SELECT * FROM goals WHERE date = $1 AND user_id = $2';
// 	  const values = [date, user_id];
// 	  db.query(query, values)
// 	    .then((data) => {
// 	      res.locals.goals = data.rows;
// 	      // console.log('Grabbed goals for: ', date, res.locals.goals);
// 	      return next();
// 	    })
// 	    .catch((err) => next({
// 	      log: `Error in GoalsController.getGoals: ${err}`,
// 	      message: {
// 	        err: 'Error occurred'
// 	      },
// 	    }))
// 	},

// 	postGoal: (req, res, next) => {
// 	  const {name, date, description,status, user_id} = req.body;
// 	  const query = 'INSERT INTO goals (name, date, description, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
// 	  const values = [name,date,description,status,user_id];
// 	  db.query(query,values)
// 	  .then((data) => {
// 	      const post = data.rows;
// 	      res.locals.goals = post;
// 	      // console.log("Posted Gaols",post);
// 	      return next();
// 	  })
// 	  .catch((err) => next({
// 	      log: `Error in GoalControllers.postGoal: ${err}`,
// 	      message: {
// 	        err: 'Error occurred'
// 	      },
// 	  }))
// 	},

// 	updateGoal: (req, res, next) => {
// 		const { name, date, description, status, user_id } = req.body;
// 		const query =
// 			"UPDATE goals SET name = $1, date = $2, description = $3, status = $4, user_id = $5 RETURNING *";
// 		const values = [name, date, description, status, user_id];
// 		db.query(query, values)
// 			.then((data) => {
// 				const update = data.rows;
// 				res.locals.goals = update;
// 				console.log("Updated goals: ", update);
// 				return next();
// 			})
// 			.catch((err) =>
// 				next({
// 					log: `Error in GoalsControllers.updateGoals: ${err}`,
// 					message: {
// 						err: "Error occurred",
// 					},
// 				})
// 			);
// 	},

// 	deleteGoal: (req, res, next) => {
// 		const { id } = req.params;
// 		const { user_id } = req.body;
// 		const query = "DELETE FROM goals WHERE id = $1 AND user_id = $2";
// 		const values = [id, user_id];
// 		db.query(query, values)
// 			.then((data) => {
// 				console.log("Deleted Goal", data);
// 				return next();
// 			})
// 			.catch((err) =>
// 				next({
// 					log: `Error in JournalControllers.deleteJournal: ${err}`,
// 					message: {
// 						err: "Error occurred",
// 					},
// 				})
// 			);
// 	},
// };

// module.exports = GoalsControllers;
