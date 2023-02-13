const db = require("../models/models.js");

const JournalControllers = {
	// getJournal: (req, res, next) => {
	//   const { date, user_id } = req.body;
	//   const query = 'SELECT * FROM journal_entries WHERE date = $1 AND user_id = $2';
	//   const values = [date, user_id];
	//   console.log('getJournal query before database call', query);
	//   db.query(query, values)
	//     .then((data) => {
	//       if (!data.rows[0]) res.locals.journal = '';
	//       else res.locals.journal = data.rows[0];
	//       console.log('Retrieved journal entry for ', date);
	//       return next();
	//     })
	//     .catch((err) => next({
	//       log: `Error in JournalControllers.getJournal: ${err}`,
	//       message: {
	//         err: 'Error occurred'
	//       },
	//     }))
	// },

	// postJournal: (req, res, next) => {
	// 	const { date, entry, mood, user_id } = req.body;
	// 	const searchQuery =
	// 		"SELECT * FROM journal_entries WHERE date = $1 AND user_id = $2";
	// 	const searchValues = [date, user_id];
	// 	db.query(searchQuery, searchValues)
	// 		.then((response) => {
	// 			if (!response.rows[0]) {
	// 				const query =
	// 					"INSERT INTO journal_entries (date, entry, mood, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
	// 				const values = [date, entry, mood, user_id];
	// 				db.query(query, values)
	// 					.then((data) => {
	// 						// const post = data.rows;
	// 						res.locals.journal = data.rows;
	// 						console.log("Posted Journal", post);
	// 						return next();
	// 					})
	// 					.catch((err) =>
	// 						next({
	// 							log: `Error in JournalControllers.postJournal: ${err}`,
	// 							message: {
	// 								err: "Error occurred",
	// 							},
	// 						})
	// 					);
	// 			} else {
	// 				const query =
	// 					"UPDATE journal_entries SET entry = $2, mood = $3, user_id = $4 WHERE date = $1 RETURNING *";
	// 				const values = [date, entry, mood, user_id];
	// 				db.query(query, values)
	// 					.then((data) => {
	// 						res.locals.journal = data.rows;
	// 						console.log("Updated journal entry: ", res.locals.journal);
	// 						return next();
	// 					})
	// 					.catch((err) => next(err));
	// 			}
	// 		})
	// 		.catch((err) =>
	// 			next({
	// 				log: `Error in JournalControllers.postJournal: ${err}`,
	// 				message: {
	// 					err: "Error occurred",
	// 				},
	// 			})
	// 		);
	// },

	// updateJournal: (req, res, next) => {
	// 	const { id } = req.params;
	// 	const { date, entry, mood, user_id } = req.body;
	// 	const query =
	// 		"UPDATE journal_entries SET date = $1, entry = $2, mood = $3, user_id = $4 WHERE id = $5 RETURNING *";
	// 	const values = [date, entry, mood, user_id, id];
	// 	db.query(query, values)
	// 		.then((data) => {
	// 			res.locals.journal = data.rows;
	// 			console.log("Updated journal entry: ", res.locals.journal);
	// 			return next();
	// 		})
	// 		.catch((err) =>
	// 			next({
	// 				log: `Error in JournalControllers.updateJournal: ${err}`,
	// 				message: {
	// 					err: "Error occurred",
	// 				},
	// 			})
	// 		);
	// },

	deleteJournal: (req, res, next) => {
		const { id } = req.params;
		const { user_id } = req.body;
		const query = "DELETE FROM journal_entries WHERE id = $1 AND user_id = $2";
		const values = [id, user_id];
		db.query(query, values)
			.then((data) => {
				console.log("Deleted Journal Entry", data);
				return next();
			})
			.catch((err) =>
				next({
					log: `Error in JournalControllers.deleteJournal: ${err}`,
					message: {
						err: "Error occurred",
					},
				})
			);
	},
};

module.exports = JournalControllers;
