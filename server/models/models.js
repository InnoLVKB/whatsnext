const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, './.env')
});

const connectionString = process.env.CONNECTION_STRING || 'postgres://pxcddmbe:dONU1HLBs81hG41pNP0W9e1ByDP_e2T7@heffalump.db.elephantsql.com/pxcddmbe';

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query:", text);
    return pool.query(text, params, callback);
  },
};