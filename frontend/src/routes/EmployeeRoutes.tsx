import React from 'react';
import { RouteObject } from 'react-router-dom';

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
import { PromoDashboard } from '../features/employee/PromoManager/PromoDashboard';
import { DispatchDashboard } from '../features/employee/ProductManager/DispatchDashboard';
import { HistoryDashboard } from '../features/employee/ProductManager/HistoryDashboard';

// Staff
import { StaffDashboard } from '../features/employee/Staff/StaffDashboard';

// ProtectedRoute
import { ProtectedRoute } from '../components/ProtectedRoute';

export const EmployeeRoutes: RouteObject[] = [
  {
    children: [
      // LUỒNG GIÁM ĐỐC (Admin) - role 2
      {
        path: 'admin',
        children: [
          { index: true, element: <ProtectedRoute allowedRoles={[2]}><AdminDashboard /></ProtectedRoute> },
          { path: 'dispatch', element: <ProtectedRoute allowedRoles={[2]}><AdminDispatch /></ProtectedRoute> },
          { path: 'history', element: <ProtectedRoute allowedRoles={[2]}><AdminHistory /></ProtectedRoute> },
          { path: 'promo', element: <ProtectedRoute allowedRoles={[2]}><AdminPromo /></ProtectedRoute> },
        ]
      },

      // LUỒNG KỸ THUẬT (Tech) - role 1
      {
        path: 'tech',
        children: [
          { index: true, element: <ProtectedRoute allowedRoles={[1]}><TechAccountManagement /></ProtectedRoute> },
          { path: 'permissions', element: <ProtectedRoute allowedRoles={[1]}><TechPermissionPage /></ProtectedRoute> },
          { path: 'config', element: <ProtectedRoute allowedRoles={[1]}><TechConfigPage /></ProtectedRoute> },
          { path: 'security', element: <ProtectedRoute allowedRoles={[1]}><TechSecurityPage /></ProtectedRoute> },
        ]
      },

      // LUỒNG QUẢN LÝ CỬA HÀNG (Store) - role 4
      {
        path: 'store',
        children: [
          { index: true, element: <ProtectedRoute allowedRoles={[4]}><ManagerDashboard /></ProtectedRoute> },
          { path: 'hr', element: <ProtectedRoute allowedRoles={[4]}><ManagerHRPage /></ProtectedRoute> },
          { path: 'inventory', element: <ProtectedRoute allowedRoles={[4]}><ManagerInventoryPage /></ProtectedRoute> },
        ]
      },

      // LUỒNG QUẢN LÝ SẢN PHẨM (Product) - role 3
      {
        path: 'product',
        children: [
          { index: true, element: <ProtectedRoute allowedRoles={[3]}><ProductDashboard /></ProtectedRoute> },
          { path: 'category', element: <ProtectedRoute allowedRoles={[3]}><CategoryDashboard /></ProtectedRoute> },
          { path: 'promo', element: <ProtectedRoute allowedRoles={[3]}><PromoDashboard /></ProtectedRoute> },
          { path: 'dispatch', element: <ProtectedRoute allowedRoles={[3]}><DispatchDashboard /></ProtectedRoute> },
          { path: 'history', element: <ProtectedRoute allowedRoles={[3]}><HistoryDashboard /></ProtectedRoute> },
        ]
      },

      // LUỒNG NHÂN VIÊN (Staff) - role 5, 6, 7
      {
        path: 'staff',
        element: <ProtectedRoute allowedRoles={[5, 6, 7]}><StaffDashboard /></ProtectedRoute>
      },
    ]
  }
];