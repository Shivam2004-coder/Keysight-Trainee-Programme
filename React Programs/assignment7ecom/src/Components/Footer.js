export default function Footer() {
  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ccc",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: "5px 0" }}>Shoppy</h3>

      <p style={{ fontSize: "14px", color: "#555", margin: "5px 0" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <p style={{ fontSize: "12px", color: "#777", marginTop: "10px" }}>
        © {new Date().getFullYear()} Shoppy. All rights reserved.
      </p>
    </div>
  );
}
