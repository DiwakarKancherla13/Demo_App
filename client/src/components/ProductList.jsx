import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/products", form)
      .then(() => {
        fetchProducts(); // refresh list
        setForm({ name: "", price: "", stock: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* List Products */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} (Stock: {p.stock})
          </li>
        ))}
      </ul>
    </div>
  );
}
