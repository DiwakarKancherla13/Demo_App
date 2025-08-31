import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import SaleList from "./components/SaleList";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/sales" element={<SaleList />} />
      </Routes>
    </div>
  );
}

export default App;
