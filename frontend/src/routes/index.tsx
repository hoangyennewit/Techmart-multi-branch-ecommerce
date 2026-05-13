import { useRoutes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { CustomerRoutes } from "./CustomerRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";

export const AppRoutes = () => {
  const routes = useRoutes([
    //1. ĐĂNG NHẬP VÀ ĐĂNG KÝ
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    //2. ROUTES CHUNG CHO CẢ KHÁCH HÀNG
    ...CustomerRoutes,
    //3. ROUTES DÀNH CHO NHÂN VIÊN VÀ QUẢN LÝ
    ...EmployeeRoutes,
  ]);
  return routes;
};