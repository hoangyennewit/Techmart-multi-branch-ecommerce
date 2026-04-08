import axios from "axios"; // Lấy thư viện axios để thực hiện các yêu cầu HTTP

const API_URL = "http://localhost:5000/api/payments";
export const createPayment = async (orderData: {
    amount: number;
    orderId: string;
    bankCode?: string;
}) => {
    try{
        const response = await axios.post(`${API_URL}/create_payment_url`, orderData);
        return response.data;
    }
    catch(error) {
        console.error("Error creating payment:", error);
        throw error;
    }
}