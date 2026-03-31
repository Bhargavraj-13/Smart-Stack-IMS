function ProductList({ products, onDeleteProduct, onEditProduct }) {
  return (
    <div style={styles.wrapper}>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Section:</strong> {product.section}</p>
              <p><strong>Availability:</strong> {product.availability}</p>
              <p>
                <strong>Similar Items:</strong>{" "}
                {product.similarItems?.length
                  ? product.similarItems.join(", ")
                  : "None"}
              </p>

              <div style={styles.buttonRow}>
                <button
                  onClick={() => onEditProduct(product)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDeleteProduct(product._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: "1rem"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem"
  },
  card: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },
  editButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ProductList;