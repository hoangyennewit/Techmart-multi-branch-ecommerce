import axios from "axios"; // Lấy thư viện axios để thực hiện các yêu cầu HTTP

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/payments";
export const createPayment = async (orderData: {
  amount: number;
  orderId: string;
  bankCode?: string;
}) => {
  try {
    const token = localStorage.getItem("techmart_token");
    const response = await axios.post(
      `${API_URL}/create-payment-intent`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// ==========================================
// MOMO
// ==========================================

const MOMO_API_URL = ("https://techmartvn.xyz") + "/api/payments";
export const createMomoPayment = async (orderData: {
  ma_don_hang: string;
  tong_tien: number;
  ghi_chu?: string;
}) => {
  try {
    const token = localStorage.getItem("techmart_token");
    const response = await axios.post(
      `${MOMO_API_URL}/create`,
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data; // { success, url, data }
  } catch (error) {
    console.error("Error creating MoMo payment:", error);
    throw error;
  }
};
