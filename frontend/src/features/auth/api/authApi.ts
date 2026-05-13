import axios from 'axios';
import {User} from '../types';
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/auth';

export const authApi = {
    getProfile: async (token: string): Promise<User> => {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    login: async (email: string, password: string): Promise<{ token: string }> => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    },
};