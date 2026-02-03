import { Link } from "react-router-dom";

export default function Navbar() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  return (
    <div style={{ padding: 10, borderBottom: "1px solid black" }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/category/electronics">Electronics</Link>{" | "}
      <Link to="/category/men's clothing">Clothing</Link>{" | "}
      <Link to="/cart">Cart ({totalItems})</Link>
    </div>
  );
}
