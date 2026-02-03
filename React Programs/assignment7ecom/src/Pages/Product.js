import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/cart");
    };


  return (
    <>
      <Navbar />
      <div style={{ display: "flex", padding: 20 }}>
        <img src={product.image} alt="" width="200" />

        <div style={{ marginLeft: 20 }}>
          <h3>{product.title}</h3> {/* API */}
          <p>Rating: {product?.rating?.rate}</p> {/* API */}
          <h2>₹{product.price}</h2> {/* API */}

          {/* Static (blue box data) */}
          <p>Amazon Choice</p>
          <p>1k+ bought last month</p>

          <button onClick={addToCart}>Add to Cart</button>

          <p><b>Category:</b> {product.category}</p>
          <p>{product.description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
