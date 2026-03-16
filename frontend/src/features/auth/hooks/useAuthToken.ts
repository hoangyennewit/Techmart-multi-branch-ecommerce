import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

export const useAuthToken = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if(token) {
            localStorage.setItem('techmart_token', token);
            window.history.replaceState({}, document.title, window.location.pathname);
            console.log("Token stored in localStorage:", token);
            navigate('/');
        }
    }, [navigate]);
};