import axios from "axios";
import {Product} from "../types";

const API_URL = 'http://localhost:5000/api/products';

export const productApi = {
    getByCategory: async (slug: string): Promise<Product[]> => {
        try {
            const response = await axios.get(`${API_URL}/category/${slug}`);
            return response.data;
        } catch (error){
            console.error("Lỗi khi lấy Api danh mục sản phẩm", error);
            return [];
        }
    },
    getAllProducts: async(slug: string): Promise<Product[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    }
};