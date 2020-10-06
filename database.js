const Pool = require("pg").Pool;

const pool = new Pool({
  user: "admin",
  password: "Monique1998!!1998",
  host: "localhost",
  port: "5432",
  database: "portfolio",
});

module.exports = pool;
