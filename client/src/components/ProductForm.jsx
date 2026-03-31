import { useEffect, useState } from "react";
import theme from "../theme";

function ProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  onCancelEdit,
  allProducts
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    section: "",
    similarProducts: []
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        section: editingProduct.section || "",
        similarProducts:
          editingProduct.similarProducts?.map((product) => product._id) || []
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        section: "",
        similarProducts: []
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSimilarProductsChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => ({
      ...prev,
      similarProducts: selectedValues
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      section: formData.section,
      similarProducts: formData.similarProducts
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct._id, payload);
    } else {
      onAddProduct(payload);
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      section: "",
      similarProducts: []
    });
  };

  const selectableProducts = allProducts.filter(
    (product) => product._id !== editingProduct?._id
  );

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        {editingProduct && <span style={styles.editBadge}>Editing Mode</span>}
      </div>

      <div style={styles.grid}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <label style={styles.label}>Similar Products</label>
      <select
        multiple
        value={formData.similarProducts}
        onChange={handleSimilarProductsChange}
        style={styles.select}
      >
        {selectableProducts.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} ({product.category})
          </option>
        ))}
      </select>

      <p style={styles.helperText}>
        Hold Ctrl (or Cmd on Mac) to select multiple products.
      </p>

      <div style={styles.buttonRow}>
        <button type="submit" style={styles.primaryButton}>
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={styles.secondaryButton}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const baseInput = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  background: theme.colors.surface,
  color: theme.colors.textPrimary
};

const styles = {
  form: {
    background: `linear-gradient(180deg, ${theme.colors.surfaceLight}, ${theme.colors.surface})`,
    padding: "1.4rem",
    borderRadius: theme.radius,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow,
    marginBottom: "2rem"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    flexWrap: "wrap",
    gap: "10px"
  },
  title: {
    margin: 0,
    color: theme.colors.textPrimary
  },
  editBadge: {
    background: "rgba(255, 122, 0, 0.16)",
    color: theme.colors.accent,
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.9rem",
    fontWeight: "600"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    marginBottom: "1rem"
  },
  input: baseInput,
  label: {
    display: "block",
    marginBottom: "8px",
    color: theme.colors.textPrimary,
    fontWeight: "600"
  },
  select: {
    ...baseInput,
    minHeight: "130px"
  },
  helperText: {
    fontSize: "0.9rem",
    color: theme.colors.textSecondary
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  primaryButton: {
    background: theme.colors.accent,
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    fontWeight: "600",
    cursor: "pointer"
  },
  secondaryButton: {
    background: "transparent",
    color: theme.colors.textPrimary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "10px",
    padding: "12px 18px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default ProductForm;