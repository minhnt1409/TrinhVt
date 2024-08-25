import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Địa chỉ backend Flask
});

export const signUp = (formData) => API.post('/signup', formData);
export const login = (formData) => API.post('/login', formData);

export const getProducts = () => API.get('/products');

export const createProduct = (productData, token) =>
  API.post('/products', productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (productId, productData, token) =>
  API.put(`/products/${productId}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (productId, token) =>
  API.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
