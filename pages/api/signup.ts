import { type NextApiRequest, type NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import db from '../../lib/db'
import jwt from 'jsonwebtoken'

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
          db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username', [username, hash])
            .then((dbResult) => {
              const token = jwt.sign({ user_id: dbResult.rows[0].user_id, username: dbResult.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '1d' })
              res.status(200).json({
                message: 'User logged in',
                username: dbResult.rows[0].username,
                user_id: dbResult.rows[0].user_id,
                token
              })
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
