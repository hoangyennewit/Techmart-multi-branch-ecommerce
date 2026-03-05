import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../features/home/pages/Homepage";
import {ProductDetail} from "../features/products/pages/ProductDetail";
import {LoginPage} from "../features/auth/pages/LoginPage";
import {RegisterPage} from "../features/auth/pages/RegisterPage";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
};