import { useEffect, useState } from "react";
import axios from "axios";

export default function SaleList() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  const fetchSales = () => {
    axios
      .get("http://localhost:5000/api/sales")
      .then((res) => setSales(res.data))
      .catch((err) => console.error(err));
  };

  const fetchOptions = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSales();
    fetchOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/sales", form)
      .then(() => {
        fetchSales();
        setForm({ customer_id: "", product_id: "", quantity: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <select
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select>
        <select
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (${p.price})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <button type="submit">Add Sale</button>
      </form>
      <ul>
        {sales.map((s) => (
          <li key={s.id}>
            {s.customer_name} bought {s.quantity} × {s.product_name} → $
            {s.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
