import { Pool } from "pg";

let db;
const connectionString = 'postgres://pxcddmbe:soXd8-HF0Fz9__fNMoqeFXTq3upUEnWN@heffalump.db.elephantsql.com/pxcddmbe';

if (!db) {
  db = new Pool({
    connectionString: connectionString,
  });
}

export default db;