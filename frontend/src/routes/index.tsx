import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import {ProductPage} from "../features/products/pages/ProductPage";
import {LoginPage} from "../features/auth/pages/LoginPage";
import {RegisterPage} from "../features/auth/pages/RegisterPage";
export const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/products/:id" element={<ProductPage/>}/>
            </Routes>
    );
};