import { Routes, Route } from 'react-router-dom';

// --- 1. IMPORT CÁC TRANG AUTH (XÁC THỰC) ---
import { RoleSelection } from './features/auth/pages/RoleSelection';
import { LoginPage } from './features/auth/pages/LoginPage';

// --- 2. IMPORT CÁC TRANG CỦA GIÁM ĐỐC (ADMIN) ---
import { AdminDashboard } from './features/Admin/AdminDashboard';
import { AdminDispatch } from './features/Admin/AdminDispatch';
import { AdminHistory } from './features/Admin/AdminHistory';
import { AdminPromo } from './features/Admin/AdminPromo';

// --- 3. IMPORT CÁC TRANG BỘ PHẬN KỸ THUẬT (TECH) ---
import { TechAccountManagement } from './features/Tech/TechAccountManagement';
import { TechPermissionPage } from './features/Tech/TechPermissionPage';
import { TechConfigPage } from './features/Tech/TechConfigPage';
import { TechSecurityPage } from './features/Tech/TechSecurityPage';

// --- 4. IMPORT CÁC TRANG QUẢN LÝ CỬA HÀNG (MANAGER) ---
import { ManagerDashboard } from './features/Manager/ManagerDashboard';
import { ManagerHRPage } from './features/Manager/ManagerHRPage';
import { ManagerInventoryPage } from './features/Manager/ManagerInventoryPage';

// --- 5. IMPORT CÁC TRANG QUẢN LÝ SẢN PHẨM (PRODUCT) ---
import { ProductDashboard } from './features/ProductManager/ProductDashboard';
import { CategoryDashboard } from './features/ProductManager/CategoryDashboard';
import { DispatchDashboard } from './features/ProductManager/DispatchDashboard';
import { HistoryDashboard } from './features/ProductManager/HistoryDashboard';
// Import Promo từ đúng thư mục PromoManager của bạn:
import { PromoDashboard } from './features/PromoManager/PromoDashboard';
// --- 6. IMPORT TRANG NHÂN VIÊN (STAFF) ---
import { StaffDashboard } from './features/Staff/StaffDashboard';

function App() {
  return (
    <Routes>
      {/* LUỒNG CHÀO MỪNG & ĐĂNG NHẬP */}
      <Route path="/" element={<RoleSelection />} />
      <Route path="/login" element={<LoginPage />} />

      {/* LUỒNG GIÁM ĐỐC */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/dispatch" element={<AdminDispatch />} />
      <Route path="/admin/history" element={<AdminHistory />} />
      <Route path="/admin/promo" element={<AdminPromo />} />

      {/* LUỒNG BỘ PHẬN KỸ THUẬT */}
      <Route path="/tech" element={<TechAccountManagement />} />
      <Route path="/tech/permissions" element={<TechPermissionPage />} />
      <Route path="/tech/config" element={<TechConfigPage />} />
      <Route path="/tech/security" element={<TechSecurityPage />} />

      {/* LUỒNG QUẢN LÝ CỬA HÀNG */}
      <Route path="/store" element={<ManagerDashboard />} />
      <Route path="/store/hr" element={<ManagerHRPage />} />
      <Route path="/store/inventory" element={<ManagerInventoryPage />} />

      {/* LUỒNG QUẢN LÝ SẢN PHẨM */}
      <Route path="/product" element={<ProductDashboard />} />
      <Route path="/product/category" element={<CategoryDashboard />} />
      <Route path="/product/promo" element={<PromoDashboard />} />
      <Route path="/product/dispatch" element={<DispatchDashboard />} />
      <Route path="/product/history" element={<HistoryDashboard />} />

      {/* LUỒNG NHÂN VIÊN */}
      <Route path="/staff" element={<StaffDashboard />} />

      {/* TRANG LỖI 404 CƠ BẢN */}
      <Route path="*" element={<div className="p-10 text-center text-2xl font-bold">404 - Không tìm thấy trang này!</div>} />
    </Routes>
  );
}

export default App;