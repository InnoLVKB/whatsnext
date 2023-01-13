// const path = require('path');
import path from 'path'
// import from 'dotenv'.config()
// require("dotenv").config({
//   path: path.resolve(__dirname, './.env')
// });

const connectionString = 'postgres://pxcddmbe:soXd8-HF0Fz9__fNMoqeFXTq3upUEnWN@heffalump.db.elephantsql.com/pxcddmbe';

// const { Pool } = require("pg");
// const pool = new Pool({
//   connectionString: connectionString,
// });

// module.exports = {
//   query: (text, params, callback) => {
//     console.log("executed query:", text);
//     return pool.query(text, params, callback);
//   },
// };

import { Pool } from 'pg';
const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
// export default function query() {
//   console.log('hello')
//   return "brian"
// }

// export default function query(text, params, callback) {
//   console.log('hello')
//   console.log("executed query:", text);
//   return pool.query(text, params, callback);
// }