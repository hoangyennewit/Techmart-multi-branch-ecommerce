import React from 'react';
import { UserCircle, Printer, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Import 2 component con
import { InventoryProductTable } from '../../../components/Manager/InventoryProductTable';
import { InventorySidebar } from '../../../components/Manager/InventorySidebar';
import { ManagerHeader } from '../../../components/Manager/ManagerHeader';

export const ManagerInventoryPage = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <ManagerHeader />

        {/* --- MAIN MENU TABS --- */}
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
          <Link to="/store" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Doanh thu & Báo cáo</Link>
          <Link to="/store/hr" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store/hr' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Nhân sự & HR</Link>
          <Link to="/store/inventory" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store/inventory' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Kho</Link>
          
          {/* Nút In ấn đẩy sang bên phải */}
          <div className="ml-auto flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 text-sm transition-colors shadow-sm"><Printer size={16} /> In/Xuất Excel</button>
            <button className="flex items-center gap-2 px-5 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-full hover:bg-purple-100 text-sm transition-colors shadow-sm"><Eye size={16} /> Xem trước</button>
          </div>
        </div>

        {/* --- KHU VỰC NỘI DUNG CHÍNH CỦA KHO --- */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bảng sản phẩm (Bên trái) */}
          <InventoryProductTable />
          
          {/* Thanh tương tác (Bên phải) */}
          <InventorySidebar />
        </div>

      </div>
    </div>
  );
};