import { useEffect, useState } from "react";

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
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

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
        <button type="submit" style={styles.button}>
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "2rem"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold"
  },
  select: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  helperText: {
    fontSize: "0.9rem",
    color: "#666"
  },
  buttonRow: {
    display: "flex",
    gap: "10px"
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  cancelButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ProductForm;