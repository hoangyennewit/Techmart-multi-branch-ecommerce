import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";
const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("techmart_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const createOrder = async (orderData: any) => {
  try {
    const response = await apiClient.post(`${API_URL}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getMyOrdersAPI = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/my-orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my orders:", error);
    throw error;
  }
};

export const getOrderApi = async (orderId: any) => {
  try {
    const response = await apiClient.get(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
