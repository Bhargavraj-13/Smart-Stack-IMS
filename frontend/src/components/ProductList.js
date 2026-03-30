import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, onEdit, onDeleted, onSaleRecorded }) {
  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2 className="list-title">Inventory ({products.length})</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDeleted={onDeleted}
            onSaleRecorded={onSaleRecorded}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
