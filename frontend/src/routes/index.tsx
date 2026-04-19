import {BrowserRouter, Routes, Route} from "react-router-dom";
import { HomePage } from "../features/home/pages/HomePage";
import {ProductPage} from "../features/products/pages/ProductPage";
import {CartPage} from "../features/cart/pages/CartPage";
import {CheckoutPage} from "../features/checkout/pages/CheckoutPage";
import {OrderTrackingPage} from "../features/orders/pages/OrderTrackingPage";
import {LoginPage} from "../features/auth/pages/LoginPage";
import {RegisterPage} from "../features/auth/pages/RegisterPage";
import { CategoryPage } from "../features/products/pages/CategoryPage";
export const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/category/:slug" element={<CategoryPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/orders" element={<OrderTrackingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/products/:id" element={<ProductPage/>}/>
            </Routes>
    );
};