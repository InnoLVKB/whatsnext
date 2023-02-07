import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { method } = req;
		const { username, password } = req.body;
		switch (method) {
			case "POST":
				const query = "SELECT * FROM users WHERE username = $1;";
				const values = [username];
				const data = await db.query(query, values);
				const dbPassword = data.rows[0].password;
				bcrypt.compare(password, dbPassword, function (err, result) {
					if (result) {
						res.status(200).json({
							message: "User logged in",
							username: data.rows[0].username,
							user_id: data.rows[0].user_id,
						});
					} else {
						res.status(500).json({ error: "Something went wrong" });
					}
				});
				break;
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};
