import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/api/products`, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/api/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/api/products/${id}`);
  return response.data;
};