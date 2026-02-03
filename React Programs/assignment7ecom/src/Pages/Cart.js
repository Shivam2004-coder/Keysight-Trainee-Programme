import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const increaseQty = (id) => {
    const updated = cart.map(p =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <h2>Cart Page</h2>

      {cart.map(p => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid black",
            padding: 10,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <img src={p.image} alt="" width="80" />

          <div style={{ flex: 1 }}>
            <p>{p.title}</p>
            <p>
              ₹{p.price} × {p.quantity} = ₹{p.price * p.quantity}
            </p>
          </div>

          <button onClick={() => increaseQty(p.id)}>+</button>
        </div>
      ))}

      <h3>Total Cart Price: ₹{totalPrice}</h3>

      <Link to="/category/electronics">
        <button>Purchase More</button>
      </Link>

      <Footer />
    </>
  );
}
