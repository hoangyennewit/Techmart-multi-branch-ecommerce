import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {User, AuthContextType} from '../types';
import {authApi} from '../api/authApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchUserProfile = async (token: string) => {
        try {
            setLoading(true);
            const userData = await authApi.getProfile(token);
            setUser(userData);
            console.log("Lấy profile thành công:", userData);
        } catch (error) {
            console.error("Lỗi lấy profile hoặc Token hết hạn:", error);
            localStorage.removeItem('techmart_token');
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem('techmart_token');
        setUser(null);
        navigate('/login');
    };
    useEffect (() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if(token) {
            localStorage.setItem('techmart_token', token);
            window.history.replaceState({}, document.title, window.location.pathname);
            fetchUserProfile(token);
        }
        else {
            const savedToken = localStorage.getItem('techmart_token');
            if(savedToken) {
                fetchUserProfile(savedToken);
            }
            else {
                setLoading(false);
            }
        }
    }, []);
    return (
        <AuthContext.Provider value={{user, 
            isAuthenticated: !!user,
            loading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
