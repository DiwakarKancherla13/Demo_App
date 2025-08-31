const db = require("../db");

// Create Sale
async function createSale(req, res) {
  try {
    const { customer_id, product_id, quantity } = req.body;

    // Fetch product
    const productRes = await db.query(
      "SELECT price, stock FROM products WHERE id=$1",
      [product_id]
    );
    if (productRes.rows.length === 0)
      return res.status(400).json({ error: "Product not found" });

    const product = productRes.rows[0];
    if (product.stock < quantity)
      return res.status(400).json({ error: "Not enough stock" });

    const total = product.price * quantity;

    // Insert sale
    const result = await db.query(
      `INSERT INTO sales(customer_id, product_id, quantity, total) 
       VALUES($1,$2,$3,$4) RETURNING *`,
      [customer_id, product_id, quantity, total]
    );

    // Update stock
    await db.query("UPDATE products SET stock = stock - $1 WHERE id=$2", [
      quantity,
      product_id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating sale:", err.message);
    res.status(500).send("Server error");
  }
}

// Get Sales
async function getSales(req, res) {
  try {
    const result = await db.query(
      `SELECT s.id, s.quantity, s.total, s.created_at,
              c.name as customer_name, c.email,
              p.name as product_name, p.price
       FROM sales s
       JOIN customers c ON s.customer_id = c.id
       JOIN products p ON s.product_id = p.id
       ORDER BY s.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching sales:", err.message);
    res.status(500).send("Server error");
  }
}

module.exports = { createSale, getSales };
