const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "azure_app",
  password: "F#irStA#nUNt2023",
  port: 5432,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err.message);
  });

module.exports = pool;
