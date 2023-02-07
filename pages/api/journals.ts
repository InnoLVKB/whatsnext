import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { query, method } = req;
		let dbResult;
		switch (method) {
			// Fetch journal by date and user_id
			case "GET":
				dbResult = await db.query(
					"SELECT * FROM journal_entries WHERE date = $1 AND user_id = $2",
					[query.date, query.user_id]
				);
				console.log("journal server");
				res.status(200).json(dbResult.rows);
				break;
			// Create new journal
			case "POST":
				// if there is no entry for current date, create new journal else update journal
				const { entry, mood } = req.body;
				dbResult = await db.query(
					"SELECT id FROM journal_entries WHERE date = $1 AND user_id = $2",
					[query.date, query.user_id]
				);
				if (!dbResult.rows[0]) {
					const newJournal = await createJournal(
						query.date,
						entry,
						mood,
						query.user_id
					);
					res.status(200).json(newJournal);
				} else {
					const journalId = dbResult.rows[0].id;
					const updatedJournal = await updateJournal(journalId, entry, mood);
					res.status(200).json(updatedJournal);
				}
				break;
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};

async function createJournal(date, entry, mood, user_id) {
	console.log("create");
	const dbResult = await db.query(
		"INSERT INTO journal_entries (date, entry, mood, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
		[date, entry, mood, user_id]
	);
	return dbResult.rows[0];
}

async function updateJournal(journalId, entry, mood) {
	console.log("update");
	const dbResult = await db.query(
		"UPDATE journal_entries SET entry = $1, mood = $2 WHERE id = $3 RETURNING *",
		[entry, mood, journalId]
	);
	return dbResult.rows[0];
}
