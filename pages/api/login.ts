/* eslint-disable no-case-declarations */
import { type NextApiRequest, type NextApiResponse } from 'next'
import db from '../../lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req
    const { username, password } = req.body
    switch (method) {
      case 'POST':
        const dbResult = await db.query('SELECT * FROM users WHERE username = $1;', [username])
        const dbPassword = dbResult.rows[0].password
        bcrypt.compare(password, dbPassword, function (err, result) {
          if (result) {
            // Generate JWT token
            const token = jwt.sign({ user_id: dbResult.rows[0].user_id, username: dbResult.rows[0].username }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.status(200).json({
              message: 'User logged in',
              username: dbResult.rows[0].username,
              user_id: dbResult.rows[0].user_id,
              token
            })
          } else if (err != null) {
            res.status(500).json({ error: 'Something went wrong' })
          } else {
            res.status(500).json({ error: 'Something went wrong' })
          }
        })
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
