import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 1rem", color: "#fff" }}>
        Home
      </Link>
      <Link to="/products" style={{ margin: "0 1rem", color: "#fff" }}>
        Products
      </Link>
      <Link to="/customers" style={{ margin: "0 1rem", color: "#fff" }}>
        Customers
      </Link>
      <Link to="/sales" style={{ margin: "0 1rem", color: "#fff" }}>
        Sales
      </Link>
    </nav>
  );
}
