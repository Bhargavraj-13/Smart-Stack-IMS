import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Analytics from './components/Analytics';
import { fetchProducts } from './api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await fetchProducts();
      setProducts(data);
      setError('');
    } catch {
      setError('Failed to load products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Stack IMS</h1>
        <p className="app-subtitle">Inventory Management &amp; Demand Predictor</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <ProductForm
            editingProduct={editingProduct}
            onSaved={() => {
              setEditingProduct(null);
              loadProducts();
            }}
            onCancel={() => setEditingProduct(null)}
          />
        </section>

        <section className="list-section">
          {error && <p className="error-msg">{error}</p>}
          {loading ? (
            <p className="loading-msg">Loading products…</p>
          ) : (
            <ProductList
              products={products}
              onEdit={(p) => setEditingProduct(p)}
              onDeleted={loadProducts}
              onSaleRecorded={loadProducts}
            />
          )}
        </section>

        <section className="analytics-section">
          <Analytics />
        </section>
      </main>
    </div>
  );
}

export default App;
