import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  sellProduct,
  getMostSoldProductToday
} from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [topSoldProduct, setTopSoldProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSoldProduct = async () => {
    try {
      const data = await getMostSoldProductToday();
      setTopSoldProduct(data.data);
    } catch (error) {
      console.error("Failed to fetch most sold product:", error);
    }
  };

  const refreshData = async () => {
    await fetchProducts();
    await fetchTopSoldProduct();
  };

  const handleAddProduct = async (productData) => {
    try {
      await createProduct(productData);
      await refreshData();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await updateProduct(id, productData);
      setEditingProduct(null);
      await refreshData();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
      await refreshData();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleSellProduct = async (id) => {
    try {
      await sellProduct(id);
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
      await refreshData();
    } catch (error) {
      console.error("Failed to sell product:", error);
      alert("Cannot sell this product. It may already be out of stock.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Smart-Stack-IMS</h1>
      <p>Retail Inventory Admin Panel</p>

      <div style={styles.analyticsCard}>
        <h2>Most Sold Product (Last 24 Hours)</h2>
        {topSoldProduct ? (
          <>
            <p><strong>Name:</strong> {topSoldProduct.name}</p>
            <p><strong>Category:</strong> {topSoldProduct.category}</p>
            <p><strong>Units Sold:</strong> {topSoldProduct.totalSold}</p>
          </>
        ) : (
          <p>No sales recorded in the last 24 hours.</p>
        )}
      </div>

      <ProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          onSellProduct={handleSellProduct}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem"
  },
  analyticsCard: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "2rem"
  }
};

export default Home;