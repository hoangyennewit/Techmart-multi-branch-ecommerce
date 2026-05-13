import React, { useState } from 'react';
import { UserCircle, Printer, Eye, Plus, Search, Send, Save } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Thêm useLocation

// Import 3 Component con
import { CategoryTree } from '../../../components/product/CategoryTree';
import { CategoryTable } from '../../../components/product/CategoryTable';
import { CategoryForms } from '../../../components/product/CategoryForms';

export const CategoryDashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  const [formFocus, setFormFocus] = useState<'category' | 'brand' | null>(null);

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
        <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4 overflow-x-auto">
          <Link to="/product" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Thông tin sản phẩm</Link>
          <Link to="/product/category" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/category' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Thông tin danh mục</Link>
          <Link to="/product/promo" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/promo' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Chương trình khuyến mãi</Link>
          <Link to="/product/dispatch" className={`relative px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/dispatch' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>
            Điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
          </Link>
          <Link to="/product/history" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/product/history' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Lịch sử</Link>
        </div>

        {/* --- ACTION BAR --- */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 bg-white p-3 rounded-full border border-gray-200 shadow-sm">
          <div className="flex gap-2">
            <button onClick={() => setFormFocus('category')} className="flex items-center gap-2 px-6 py-2.5 bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white font-bold rounded-full transition-colors">
              <Plus size={18} /> Thêm danh mục
            </button>
            <button onClick={() => setFormFocus('brand')} className="flex items-center gap-2 px-6 py-2.5 bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white font-bold rounded-full transition-colors">
              <Plus size={18} /> Thêm thương hiệu
            </button>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-purple-400" />
          </div>

          <div className="flex gap-2 pr-1">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-100 text-sm transition-colors"><Printer size={16} /> In/Xuất Excel</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-full hover:bg-purple-100 text-sm transition-colors"><Eye size={16} /> Xem trước</button>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="flex gap-6 items-start">
          <CategoryTree />
          <CategoryTable onEditClick={() => setFormFocus('brand')} />
          <CategoryForms focusForm={formFocus} />
        </div>

      </div>

      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-full shadow-xl transition-transform hover:scale-105">
          <Send size={18} /> Gửi báo cáo
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-800 hover:text-purple-700 hover:border-purple-300 font-bold rounded-full shadow-xl transition-transform hover:scale-105">
          <Save size={18} /> Lưu
        </button>
      </div>
    </div>
  );
};