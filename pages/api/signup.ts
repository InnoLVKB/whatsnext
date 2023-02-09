import { type NextApiRequest, type NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import db from '../../lib/db'

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req
    const { username, password } = req.body
    const saltRounds = 10
    switch (method) {
      case 'POST':
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err != null) {
            return {
              log: `Error in bcrypt hash: ${err}`,
              message: { err: 'Error occurred' }
            }
          }
          const query =
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id'
          const values = [username, hash]
          db.query(query, values)
            .then((result) => {
              res.status(200).json(result.rows[0])
            })
            .catch(() => {
              res.status(500).json({ error: 'This username already exists.' })
            })
        })
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
