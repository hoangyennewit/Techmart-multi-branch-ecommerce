import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const createOrder = async (orderData: any) =>{
    try {
        const response = await axios.post(`${API_URL}/create`, orderData);
        return response.data;
    }
    catch(error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const getMyOrdersAPI = async () => {
    try {
        const response = await axios.get(`${API_URL}/me`);
        return response.data;
    }
    catch(error) {
        console.error("Error fetching my orders:", error);
        throw error;
    }
};

export const getOrderApi = async (orderId: any) => {
    try {
        const response = await axios.get(`${API_URL}/${orderId}`);
        return response.data;
    }
    catch(error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};