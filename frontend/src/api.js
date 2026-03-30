import axios from 'axios';

// Base Axios instance pointing at the Express backend
const api = axios.create({
  baseURL: '/api',
});

/* ── Product APIs ── */
export const fetchProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

/* ── Sales APIs ── */
export const recordSale = (productId, quantitySold) =>
  api.post(`/sales/${productId}`, { quantitySold });
export const fetchAnalytics = () => api.get('/sales/analytics');
