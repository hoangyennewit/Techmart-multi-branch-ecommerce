import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

export const ActorRoutes = () => {
  return (
    <Routes>
      <Route path="/portal" element={<RoleSelection />} />
      <Route path="/login" element={<LoginPage />} />

      {/* LUỒNG GIÁM ĐỐC */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/dispatch" element={<AdminDispatch />} />
      <Route path="/admin/history" element={<AdminHistory />} />
      <Route path="/admin/promo" element={<AdminPromo />} />

      {/* LUỒNG KỸ THUẬT */}
      <Route path="/tech" element={<TechAccountManagement />} />
      <Route path="/tech/permissions" element={<TechPermissionPage />} />
      <Route path="/tech/config" element={<TechConfigPage />} />
      <Route path="/tech/security" element={<TechSecurityPage />} />

      {/* LUỒNG QUẢN LÝ */}
      <Route path="/store" element={<ManagerDashboard />} />
      <Route path="/store/hr" element={<ManagerHRPage />} />
      <Route path="/store/inventory" element={<ManagerInventoryPage />} />

      {/* LUỒNG SẢN PHẨM */}
      <Route path="/product" element={<ProductDashboard />} />
      <Route path="/product/category" element={<CategoryDashboard />} />
      <Route path="/product/promo" element={<PromoDashboard />} />
      <Route path="/product/dispatch" element={<DispatchDashboard />} />
      <Route path="/product/history" element={<HistoryDashboard />} />

      {/* LUỒNG NHÂN VIÊN */}
      <Route path="/staff" element={<StaffDashboard />} />
    </Routes>
  );
};