import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleAddProduct = async (productData) => {
    try {
      await createProduct(productData);
      await fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await updateProduct(id, productData);
      setEditingProduct(null);
      await fetchProducts();
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
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
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
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Smart-Stack-IMS</h1>
      <p>Retail Inventory Admin Panel</p>

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
  }
};

export default Home;