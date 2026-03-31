import { useEffect, useMemo, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import DashboardCards from "../components/DashboardCards";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  sellProduct,
  restockProduct,
  getMostSoldProductToday
} from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [topSoldProduct, setTopSoldProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSellProduct = async (id, quantity) => {
    try {
      await sellProduct(id, quantity);
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
      await refreshData();
    } catch (error) {
      console.error("Failed to sell product:", error);
      alert("Cannot sell this quantity. Check available stock.");
    }
  };

  const handleRestockProduct = async (id, quantity) => {
    try {
      await restockProduct(id, quantity);
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
      await refreshData();
    } catch (error) {
      console.error("Failed to restock product:", error);
      alert("Restock failed. Please try again.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    });
  }, [products, searchTerm]);

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Smart-Stack-IMS</h1>
      <p>Retail Inventory Admin Panel</p>

      <DashboardCards products={products} />

      <div style={styles.analyticsCard}>
        <h2>Top Revenue Product (Last 24 Hours)</h2>
        {topSoldProduct ? (
            <>
                <p><strong>Name:</strong> {topSoldProduct.name}</p>
                <p><strong>Category:</strong> {topSoldProduct.category}</p>
                <p><strong>Units Sold:</strong> {topSoldProduct.totalUnitsSold}</p>
                <p><strong>Revenue:</strong> ₹{topSoldProduct.totalRevenue}</p>
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
        allProducts={products}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
          onSellProduct={handleSellProduct}
          onRestockProduct={handleRestockProduct}
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