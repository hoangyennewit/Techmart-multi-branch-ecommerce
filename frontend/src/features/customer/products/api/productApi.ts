import axios from "axios";
import { Product } from "../types";

const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api",
});

export const ProductAPI = {
  getAll: async (categoryId?: number): Promise<Product[]> => {
    try {
      const url = categoryId
        ? `/products?categoryId=${categoryId}`
        : `/products`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      return [];
    }
  },

  getByCategory: async (slug: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get(`/products/category/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm của danh mục ${slug}:`, error);
      return [];
    }
  },

  getById: async (id: string | number): Promise<Product | null> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      return null;
    }
  },

  search: async (searchTerm: string): Promise<Product[]> => {
    try {
      if (!searchTerm.trim()) {
        return [];
      }
      const response = await apiClient.get(
        `/products/search?q=${encodeURIComponent(searchTerm)}`,
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      return [];
    }
  },
};
