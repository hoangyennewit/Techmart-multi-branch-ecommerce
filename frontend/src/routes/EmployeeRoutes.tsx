import React from 'react';
import { RouteObject } from 'react-router-dom';

// --- IMPORT TOÀN BỘ CÁC TRANG CỦA BẠN VÀO ĐÂY ---
import { RoleSelection } from '../features/auth/pages/RoleSelection';
import { LoginPage } from '../features/auth/pages/LoginPage';

// Admin
import { AdminDashboard } from '../features/Admin/AdminDashboard';
import { AdminDispatch } from '../features/Admin/AdminDispatch';
import { AdminHistory } from '../features/Admin/AdminHistory';
import { AdminPromo } from '../features/Admin/AdminPromo';

// Tech
import { TechAccountManagement } from '../features/Tech/TechAccountManagement';
import { TechPermissionPage } from '../features/Tech/TechPermissionPage';
import { TechConfigPage } from '../features/Tech/TechConfigPage';
import { TechSecurityPage } from '../features/Tech/TechSecurityPage';

// Manager
import { ManagerDashboard } from '../features/Manager/ManagerDashboard';
import { ManagerHRPage } from '../features/Manager/ManagerHRPage';
import { ManagerInventoryPage } from '../features/Manager/ManagerInventoryPage';

// Product
import { ProductDashboard } from '../features/ProductManager/ProductDashboard';
import { CategoryDashboard } from '../features/ProductManager/CategoryDashboard';
import { PromoDashboard } from '../features/PromoManager/PromoDashboard'; // Nhớ check lại đường dẫn này nhé
import { DispatchDashboard } from '../features/ProductManager/DispatchDashboard';
import { HistoryDashboard } from '../features/ProductManager/HistoryDashboard';

// Staff
import { StaffDashboard } from '../features/Staff/StaffDashboard';

export const EmployeeRoutes: RouteObject[] = [
  {
    path: '/portal',
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