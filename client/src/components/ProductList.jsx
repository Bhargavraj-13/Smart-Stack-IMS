import { useState } from "react";
import theme from "../theme";

function ProductList({
  products,
  onDeleteProduct,
  onEditProduct,
  onSellProduct,
  onRestockProduct
}) {
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => quantities[productId] || 1;

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
      <h2 style={styles.heading}>Products</h2>

      {products.length === 0 ? (
        <div style={styles.emptyState}>No products found.</div>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => {
            const isLowStock = product.stock > 0 && product.stock < 5;
            const isOutOfStock = product.stock === 0;
            const selectedQuantity = getQuantity(product._id);

            return (
              <div key={product._id} style={styles.card}>
                <div style={styles.cardTop}>
                  <h3 style={styles.productTitle}>{product.name}</h3>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(isOutOfStock
                        ? styles.outBadge
                        : isLowStock
                        ? styles.lowBadge
                        : styles.inBadge)
                    }}
                  >
                    {product.availability}
                  </span>
                </div>

                <div style={styles.infoGrid}>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Price:</strong> ₹{product.price}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Section:</strong> {product.section}</p>
                </div>

                <p style={styles.similarText}>
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
                  <span style={styles.qtyLabel}>Qty</span>

                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    style={styles.qtyButton}
                    type="button"
                  >
                    -
                  </button>

                  <span style={styles.qtyValue}>{selectedQuantity}</span>

                  <button
                    onClick={() => increaseQuantity(product._id)}
                    style={styles.qtyButton}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div style={styles.buttonRow}>
                  <button
                    onClick={() => onEditProduct(product)}
                    style={styles.secondaryButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    style={styles.dangerButton}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => onSellProduct(product._id, selectedQuantity)}
                    style={styles.primaryButton}
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
  heading: {
    color: theme.colors.textPrimary
  },
  emptyState: {
    background: theme.colors.surface,
    color: theme.colors.textSecondary,
    padding: "1rem",
    borderRadius: theme.radius,
    border: `1px solid ${theme.colors.border}`
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem"
  },
  card: {
    background: `linear-gradient(180deg, ${theme.colors.surfaceLight}, ${theme.colors.surface})`,
    padding: "1.2rem",
    borderRadius: theme.radius,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    marginBottom: "1rem"
  },
  productTitle: {
    margin: 0,
    color: theme.colors.textPrimary
  },
  statusBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.82rem",
    fontWeight: "700",
    whiteSpace: "nowrap"
  },
  inBadge: {
    background: "rgba(34, 197, 94, 0.18)",
    color: theme.colors.success
  },
  lowBadge: {
    background: "rgba(255, 176, 32, 0.18)",
    color: theme.colors.warning
  },
  outBadge: {
    background: "rgba(255, 77, 79, 0.18)",
    color: theme.colors.danger
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    color: theme.colors.textSecondary,
    marginBottom: "1rem"
  },
  similarText: {
    color: theme.colors.textSecondary
  },
  lowStockText: {
    color: theme.colors.warning,
    fontWeight: "700",
    background: "rgba(255, 176, 32, 0.14)",
    padding: "8px 10px",
    borderRadius: "8px",
    display: "inline-block"
  },
  outOfStockText: {
    color: theme.colors.danger,
    fontWeight: "700",
    background: "rgba(255, 77, 79, 0.14)",
    padding: "8px 10px",
    borderRadius: "8px",
    display: "inline-block"
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "14px",
    marginBottom: "14px"
  },
  qtyLabel: {
    fontWeight: "700",
    color: theme.colors.textPrimary
  },
  qtyButton: {
    background: theme.colors.surfaceLight,
    color: theme.colors.textPrimary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    padding: "6px 12px",
    cursor: "pointer"
  },
  qtyValue: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "700",
    color: theme.colors.textPrimary
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap"
  },
  primaryButton: {
    background: theme.colors.accent,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600"
  },
  restockButton: {
    background: "#ffffff",
    color: "#111",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600"
  },
  secondaryButton: {
    background: "transparent",
    color: theme.colors.textPrimary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600"
  },
  dangerButton: {
    background: "transparent",
    color: theme.colors.danger,
    border: `1px solid ${theme.colors.danger}`,
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default ProductList;