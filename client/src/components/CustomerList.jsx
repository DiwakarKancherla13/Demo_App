import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/customers", form)
      .then(() => {
        fetchCustomers();
        setForm({ name: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Customers</h2>

      {/* Add Customer Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* List Customers */}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.name} - {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
