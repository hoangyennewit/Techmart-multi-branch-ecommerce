import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../features/home/pages/Homepage";
import {ProductDetail} from "../features/products/pages/ProductDetail";
import {LoginPage} from "../features/auth/pages/LoginPage";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
};