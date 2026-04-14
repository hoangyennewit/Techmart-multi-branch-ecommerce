import React from 'react';
import { UserCircle, Printer, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import 2 component con
import { InventoryProductTable } from '../../components/Manager/InventoryProductTable';
import { InventorySidebar } from '../../components/Manager/InventorySidebar';

export const ManagerInventoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto relative">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest">Quản lý</p>
              <p className="text-gray-800 font-bold text-sm">Nguyễn Văn Tám</p>
            </div>
            <UserCircle size={36} className="text-gray-400" />
          </div>
        </div>

        {/* --- MAIN MENU (DÙNG ROUTER LINK) --- */}
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4">
          <Link to="/store" className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all border border-transparent">
            Doanh thu & Báo cáo
          </Link>
          <Link to="/store/hr" className="px-6 py-2.5 text-gray-500 hover:text-purple-700 font-semibold rounded-full hover:bg-white transition-all border border-transparent">
            Nhân sự & HR
          </Link>
          <div className="px-6 py-2.5 bg-purple-700 text-white font-bold rounded-full shadow-md cursor-default">
            Kho
          </div>
          
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