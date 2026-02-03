import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

export default function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
        .get(`https://fakestoreapi.com/products/category/${name}?limit=10`)
        .then(res => setProducts(res.data));

  }, [name]);

  return (
    <>
      <Navbar />
      <h2 style={{ padding: 10 }}>Welcome to {name} Page</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "10px"
        }}
      >
        {products.map(p => (
          <div
            key={p.id}
            style={{
              border: "1px solid black",
              width: "220px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {/* Fixed image box */}
            <div
              style={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={p.image}
                alt=""
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* Text */}
            <p style={{ fontSize: "14px", margin: "10px 0" }}>
              {p.title}
            </p>

            {/* Button always at bottom */}
            <Link to={`/product/${p.id}`} style={{ marginTop: "auto" }}>
              View
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
