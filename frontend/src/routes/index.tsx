import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import {ProductPage} from "../features/products/pages/ProductPage";
import {CartPage} from "../features/cart/pages/CartPage";
import {CheckoutPage} from "../features/checkout/pages/CheckoutPage";
import {LoginPage} from "../features/auth/pages/LoginPage";
import {RegisterPage} from "../features/auth/pages/RegisterPage";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/products/:id" element={<ProductPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};