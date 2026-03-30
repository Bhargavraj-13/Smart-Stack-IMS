import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api';
import './ProductForm.css';

const EMPTY_FORM = { name: '', price: '', quantity: '', category: '' };

function ProductForm({ editingProduct, onSaved, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Populate form when entering edit mode
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        category: editingProduct.category,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: form.category.trim(),
      };
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }
      setForm(EMPTY_FORM);
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">
        {editingProduct ? 'Edit Product' : 'Add Product'}
      </h2>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Hammer"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 12.99"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 50"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Tools"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Saving…' : editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
