function ProductList({ products, onDeleteProduct, onEditProduct, onSellProduct }) {
  return (
    <div style={styles.wrapper}>
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => {
            const isLowStock = product.stock > 0 && product.stock < 5;
            const isOutOfStock = product.stock === 0;

            return (
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

                {isLowStock && (
                  <p style={styles.lowStockText}>⚠ Restock Needed</p>
                )}

                {isOutOfStock && (
                  <p style={styles.outOfStockText}>✖ Out of Stock</p>
                )}

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

                  <button
                    onClick={() => onSellProduct(product._id)}
                    style={styles.sellButton}
                    disabled={isOutOfStock}
                  >
                    Sell 1
                  </button>
                </div>
              </div>
            );
          })}
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
    marginTop: "10px",
    flexWrap: "wrap"
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
  },
  sellButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
    lowStockText: {
    color: "#b26a00",
    fontWeight: "bold",
    background: "#fff3cd",
    padding: "6px 10px",
    borderRadius: "6px",
    display: "inline-block"
  },
    outOfStockText: {
    color: "#c62828",
    fontWeight: "bold",
    background: "#fdecea",
    padding: "6px 10px",
    borderRadius: "6px",
    display: "inline-block"
  }
};

export default ProductList;