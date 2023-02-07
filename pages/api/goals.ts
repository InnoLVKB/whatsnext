import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { query, method } = req;
		let dbResult;
		switch (method) {
			// Fetch goals for date and user_id
			case "GET":
				dbResult = await db.query(
					"SELECT * FROM goals WHERE date = $1 and user_id = $2",
					[query.date, query.user_id]
				);
				res.status(200).json(dbResult.rows);
				break;
			// Create new goal
			case "POST":
				const { name, description, status } = req.body;
				dbResult = await db.query(
					"INSERT INTO goals (name, description, date, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
					[name, description, query.date, status, query.user_id]
				);
				res.status(200).json(dbResult.rows[0]);
				break;
			// Update goal
			case "PATCH":
				const {
					name: newName,
					description: newDescription,
					status: newStatus,
				} = req.body;

				dbResult = await db.query(
					"UPDATE goals SET name = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
					[newName, newDescription, newStatus, query.id, query.user_id]
				);
				res.status(200).json(dbResult.rows[0]);
				break;
			case "DELETE":
				dbResult = await db.query(
					"DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING *",
					[query.id, query.user_id]
				);
				res.status(200).json(dbResult.rows[0]);
				break;
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};
