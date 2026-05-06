import axios from 'axios';
import type { Product } from '../types/product';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
})

export const getProducts = () => api.get<{ data: Product[] }>('/products');
export const createProduct = (data: Product) => api.post('/products', data);
export const updateProduct = (id: number, data: Product) => api.put(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

export default {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};