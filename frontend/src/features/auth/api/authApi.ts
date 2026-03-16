import axios from 'axios';
import {User} from '../types';
const API_URL = 'http://localhost:5000/api/auth';

export const authApi = {
    getProfile: async (token: string): Promise<User> => {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};