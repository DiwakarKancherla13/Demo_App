const express = require("express");
const cors = require("cors");
const pool = require("./db");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const saleRoutes = require("./routes/saleRoutes");

const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", saleRoutes);

app.get("/api", (req, res) => res.json({ message: "Hello, Azure!" }));
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(port, () => console.log(`Server listening on ${port}`));

module.exports = app;
