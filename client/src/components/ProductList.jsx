import { useState } from "react";

function ProductList({
  products,
  onDeleteProduct,
  onEditProduct,
  onSellProduct,
  onRestockProduct
}) {
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: getQuantity(productId) + 1
    }));
  };

  const decreaseQuantity = (productId) => {
    const currentQuantity = getQuantity(productId);

    if (currentQuantity > 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQuantity - 1
      }));
    }
  };

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
            const selectedQuantity = getQuantity(product._id);

            return (
              <div key={product._id} style={styles.card}>
                <h3 style={styles.productTitle}>{product.name}</h3>

                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Section:</strong> {product.section}</p>
                <p><strong>Availability:</strong> {product.availability}</p>
                <p>
                <strong>Similar Products:</strong>{" "}
                {product.similarProducts?.length
                    ? product.similarProducts.map((item) => item.name).join(", ")
                    : "None"}
                </p>

                {isLowStock && (
                  <p style={styles.lowStockText}>⚠ Restock Needed</p>
                )}

                {isOutOfStock && (
                  <p style={styles.outOfStockText}>✖ Out of Stock</p>
                )}

                <div style={styles.quantityRow}>
                  <span style={styles.quantityLabel}>Qty</span>

                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    style={styles.quantityButton}
                    type="button"
                  >
                    -
                  </button>

                  <span style={styles.quantityValue}>{selectedQuantity}</span>

                  <button
                    onClick={() => increaseQuantity(product._id)}
                    style={styles.quantityButton}
                    type="button"
                  >
                    +
                  </button>
                </div>

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
                    onClick={() => onSellProduct(product._id, selectedQuantity)}
                    style={styles.sellButton}
                    disabled={isOutOfStock}
                  >
                    Sell
                  </button>

                  <button
                    onClick={() => onRestockProduct(product._id, selectedQuantity)}
                    style={styles.restockButton}
                  >
                    Restock
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1rem"
  },
  card: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  productTitle: {
    marginTop: 0
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
    marginBottom: "12px"
  },
  quantityLabel: {
    fontWeight: "bold"
  },
  quantityButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  quantityValue: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "bold"
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
  restockButton: {
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