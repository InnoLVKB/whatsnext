import { Pool } from 'pg'

let db
const connectionString = process.env.CONNECTION_STRING

if (!db) {
  db = new Pool({
    connectionString
  })
}

export default db
