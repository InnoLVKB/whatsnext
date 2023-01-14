import { NextApiRequest, NextApiResponse } from 'next'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
import db from '../../lib/db'

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const { username, password } = req.body;
    switch (method) {
      case 'POST':
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              return ({
                log: `Error in bcrypt hash: ${err}`,
                message: { err: 'Error occurred' },
              });
            }
            const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id';
            const values = [username, hash];
            db.query(query, values)
              .then((result) => {
                console.log(result.rows[0]);
                res.status(200).json(result.rows[0]);
              })
              .catch((err) => {
                res.status(500).json({ error: 'Something went wrong' });
              }
            );
          });
        break
  }
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Something went wrong' });
}};