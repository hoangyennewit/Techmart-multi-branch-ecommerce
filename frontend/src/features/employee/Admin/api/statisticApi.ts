import axios from 'axios';

// Lấy URL gốc giống như bên authApi
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

// Tạo một hàm helper để tự động lấy token gắn vào header
const getAuthConfig = () => {
  const token = localStorage.getItem('techmart_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const statisticApi = {
  // 1. API lấy 4 thẻ Tổng quan trên cùng (Tổng doanh thu, Đơn mới, Tỉ lệ hủy...)
  getDashboardStats: async (timeframe: string) => {
    const response = await axios.get(`${API_URL}/dashboard/stats`, {
      params: { timeframe },
      ...getAuthConfig() // <-- Gắn token vào đây
    });
    return response.data;
  },

  // 2. API lấy dữ liệu vẽ Biểu đồ doanh thu
  getRevenueStats: async (timeframe: string, year: number, month?: number) => {
    const response = await axios.get(`${API_URL}/stats/revenue`, {
      params: { timeframe, year, month },
      ...getAuthConfig() // <-- Gắn token vào đây
    });
    return response.data;
  }
};