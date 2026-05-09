import React from 'react';
import { RouteObject } from 'react-router-dom';

// --- IMPORT TOÀN BỘ CÁC TRANG CỦA BẠN VÀO ĐÂY ---
import { RoleSelection } from '../features/auth/pages/RoleSelection';
import { LoginPage } from '../features/auth/pages/LoginPage';

// Admin
import { AdminDashboard } from '../features/employee/Admin/AdminDashboard';
import { AdminDispatch } from '../features/employee/Admin/AdminDispatch';
import { AdminHistory } from '../features/employee/Admin/AdminHistory';
import { AdminPromo } from '../features/employee/Admin/AdminPromo';

// Tech
import { TechAccountManagement } from '../features/employee/Tech/TechAccountManagement';
import { TechPermissionPage } from '../features/employee/Tech/TechPermissionPage';
import { TechConfigPage } from '../features/employee/Tech/TechConfigPage';
import { TechSecurityPage } from '../features/employee/Tech/TechSecurityPage';

// Manager
import { ManagerDashboard } from '../features/employee/Manager/ManagerDashboard';
import { ManagerHRPage } from '../features/employee/Manager/ManagerHRPage';
import { ManagerInventoryPage } from '../features/employee/Manager/ManagerInventoryPage';

// Product
import { ProductDashboard } from '../features/employee/ProductManager/ProductDashboard';
import { CategoryDashboard } from '../features/employee/ProductManager/CategoryDashboard';
import { PromoDashboard } from '../features/employee/PromoManager/PromoDashboard'; // Nhớ check lại đường dẫn này nhé
import { DispatchDashboard } from '../features/employee/ProductManager/DispatchDashboard';
import { HistoryDashboard } from '../features/employee/ProductManager/HistoryDashboard';

// Staff
import { StaffDashboard } from '../features/employee/Staff/StaffDashboard';

export const EmployeeRoutes: RouteObject[] = [
  {
    children: [
      // Trang chọn vai trò (Lối vào portal)
      { index: true, element: <RoleSelection /> },

      // LUỒNG GIÁM ĐỐC (Admin)
      {
        path: 'admin',
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'dispatch', element: <AdminDispatch /> },
          { path: 'history', element: <AdminHistory /> },
          { path: 'promo', element: <AdminPromo /> },
        ]
      },

      // LUỒNG KỸ THUẬT (Tech)
      {
        path: 'tech',
        children: [
          { index: true, element: <TechAccountManagement /> },
          { path: 'permissions', element: <TechPermissionPage /> },
          { path: 'config', element: <TechConfigPage /> },
          { path: 'security', element: <TechSecurityPage /> },
        ]
      },

      // LUỒNG QUẢN LÝ CỬA HÀNG (Store)
      {
        path: 'store',
        children: [
          { index: true, element: <ManagerDashboard /> },
          { path: 'hr', element: <ManagerHRPage /> },
          { path: 'inventory', element: <ManagerInventoryPage /> },
        ]
      },

      // LUỒNG QUẢN LÝ SẢN PHẨM (Product)
      {
        path: 'product',
        children: [
          { index: true, element: <ProductDashboard /> },
          { path: 'category', element: <CategoryDashboard /> },
          { path: 'promo', element: <PromoDashboard /> },
          { path: 'dispatch', element: <DispatchDashboard /> },
          { path: 'history', element: <HistoryDashboard /> },
        ]
      },

      // LUỒNG NHÂN VIÊN (Staff)
      {
        path: 'staff',
        element: <StaffDashboard />
      },
    ]
  }
];