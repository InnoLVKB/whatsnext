import { type NextApiRequest, type NextApiResponse } from 'next'
import db from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query, method } = req
    let dbResult
    switch (method) {
      // Fetch journal entries for user for mood chart
      case 'GET':
        dbResult = await db.query(
          'SELECT * FROM journal_entries WHERE user_id = $1',
          [query.user_id]
        )
        res.status(200).json(dbResult.rows)
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
