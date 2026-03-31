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

export const sellProduct = async (id, quantity) => {
  const response = await axios.patch(`${API_URL}/api/products/${id}/sell`, {
    quantity
  });
  return response.data;
};

export const restockProduct = async (id, quantity) => {
  const response = await axios.patch(`${API_URL}/api/products/${id}/restock`, {
    quantity
  });
  return response.data;
};

export const getMostSoldProductToday = async () => {
  const response = await axios.get(`${API_URL}/api/products/most-sold-today`);
  return response.data;
};