const db = require("../db");

async function createProduct(req, res) {
  const { name, description, price, stock } = req.body;
  const result = await db.query(
    "INSERT INTO products(name,description,price,stock) VALUES($1,$2,$3,$4) RETURNING *",
    [name, description, price, stock]
  );
  res.json(result.rows[0]);
}

async function getProducts(req, res) {
  const result = await db.query("SELECT * FROM products ORDER BY id");
  res.json(result.rows);
}

async function getProduct(req, res) {
  const { id } = req.params;
  const result = await db.query("SELECT * FROM products WHERE id=$1", [id]);
  if (result.rows.length === 0)
    return res.status(404).json({ error: "not found" });
  res.json(result.rows[0]);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const result = await db.query(
    "UPDATE products SET name=$1,description=$2,price=$3,stock=$4 WHERE id=$5 RETURNING *",
    [name, description, price, stock, id]
  );
  res.json(result.rows[0]);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await db.query("DELETE FROM products WHERE id=$1", [id]);
  res.json({ deleted: true });
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
