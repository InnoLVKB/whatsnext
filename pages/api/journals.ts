import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const { date, user_id } = req.body;
    switch (method) {
      case 'POST':
        const query = 'SELECT * FROM journal_entries WHERE date = $1 AND user_id = $2';
        const values = [date, user_id];
        const result = await db.query(query, values);
        res.status(200).json(result.rows);
        break
  }
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Something went wrong' });
}};