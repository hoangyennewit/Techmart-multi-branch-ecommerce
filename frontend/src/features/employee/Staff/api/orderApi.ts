import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động đính kèm token vào header cho mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('techmart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderApi = {
  /**
   * Lấy danh sách đơn hàng cho Staff
   * @param params { keyword, status, page, limit }
   */
  getOrders: async (params: any) => {
    const response = await api.get('/staff/orders', { params });
    return response.data;
  },

  /**
   * Lấy chi tiết một đơn hàng cụ thể
   */
  getOrderDetails: async (orderId: number) => {
    const response = await api.get(`/staff/orders/${orderId}`);
    return response.data;
  },

  /**
   * Cập nhật trạng thái đơn hàng (Xác nhận, Giao hàng...)
   */
  updateOrderStatus: async (orderId: number, status: string) => {
    const response = await api.patch(`/staff/orders/${orderId}/status`, { status });
    return response.data;
  }
};