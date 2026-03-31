import { useState } from "react";

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    section: "",
    similarItems: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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
      similarItems: formData.similarItems
        ? formData.similarItems.split(",").map((item) => item.trim())
        : []
    };

    onAddProduct(payload);

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      section: "",
      similarItems: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Product</h2>

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

      <input
        type="text"
        name="similarItems"
        placeholder="Similar Items (comma separated)"
        value={formData.similarItems}
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Add Product
      </button>
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
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ProductForm;