const db = require("../db");

async function createCustomer(req, res) {
  const { name, email } = req.body;
  const result = await db.query(
    "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
    [name, email]
  );
  res.json(result.rows[0]);
}

async function getCustomers(req, res) {
  const result = await db.query("SELECT * FROM customers ORDER BY id");
  res.json(result.rows);
}

module.exports = { createCustomer, getCustomers };
