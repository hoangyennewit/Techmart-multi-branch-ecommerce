import React from 'react';
import { UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Thêm useLocation

// Import Component con
import { HistoryTable } from '../../components/product/HistoryTable';

export const HistoryDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="text-right">
              <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest">Quản lý SP</p>
              <p className="text-gray-800 font-bold text-sm">Nguyễn Văn Tám</p>
            </div>
            <UserCircle size={36} className="text-gray-400" />
          </div>
        </div>

        {/* --- MAIN MENU TABS CÓ ROUTER --- */}
        <div className="flex gap-3 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
          <Link to="/product" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Thông tin sản phẩm</Link>
          <Link to="/product/category" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/category' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Thông tin danh mục</Link>
          <Link to="/product/promo" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/promo' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Chương trình khuyến mãi</Link>
          <Link to="/product/dispatch" className={`relative px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/dispatch' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>
            Điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
          </Link>
          <Link to="/product/history" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/history' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Lịch sử</Link>
        </div>

        <HistoryTable />

      </div>
    </div>
  );
};