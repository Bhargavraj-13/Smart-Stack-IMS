import React, { useState } from 'react';
import { deleteProduct, recordSale } from '../api';
import './ProductCard.css';

function ProductCard({ product, onEdit, onDeleted, onSaleRecorded }) {
  const [saleQty, setSaleQty] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [msg, setMsg] = useState('');

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await deleteProduct(product._id);
      onDeleted();
    } catch {
      alert('Failed to delete product');
    }
  };

  const handleSale = async () => {
    if (saleQty < 1) return;
    setProcessing(true);
    setMsg('');
    try {
      await recordSale(product._id, saleQty);
      setMsg(`Sold ${saleQty} unit(s)`);
      setSaleQty(1);
      onSaleRecorded();
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Sale failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`product-card${product.lowStock ? ' low-stock' : ''}`}>
      {/* Low stock badge */}
      {product.lowStock && (
        <span className="low-stock-badge">⚠ Low Stock</span>
      )}

      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>

      <div className="product-stats">
        <div className="stat">
          <span className="stat-label">Price</span>
          <span className="stat-value">${product.price.toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Qty</span>
          <span className="stat-value">{product.quantity}</span>
        </div>
      </div>

      {/* Restock suggestion */}
      {product.restockSuggestion > 0 && (
        <p className="restock-suggestion">
          Restock suggestion: +{product.restockSuggestion} units
        </p>
      )}

      {/* Sell action */}
      <div className="sale-row">
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={saleQty}
          onChange={(e) => setSaleQty(Number(e.target.value))}
          className="sale-input"
          aria-label="Quantity to sell"
        />
        <button
          className="btn-sell"
          onClick={handleSale}
          disabled={processing || product.quantity === 0}
        >
          {processing ? '…' : 'Sell'}
        </button>
      </div>
      {msg && <p className="sale-msg">{msg}</p>}

      {/* Edit / Delete */}
      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
