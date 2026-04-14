import React, { useState } from 'react';
import { UserCircle, Send, Paperclip } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Thêm useLocation

// Import Component con
import { DispatchRequestTab } from '../../components/product/DispatchRequestTab';
import { DispatchExportTab } from '../../components/product/DispatchExportTab';
import { DispatchRejectModal } from '../../components/product/DispatchRejectModal';

export const DispatchDashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const [activeTab, setActiveTab] = useState<'request' | 'export'>('request');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

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

        {/* --- SUB TABS --- */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('request')}
            className={`relative px-8 py-2.5 rounded-full font-bold transition-all border ${activeTab === 'request' ? 'bg-white text-purple-700 shadow-sm border-purple-200' : 'text-gray-500 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
          >
            Yêu cầu
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
          </button>
          <button 
            onClick={() => setActiveTab('export')}
            className={`px-8 py-2.5 rounded-full font-bold transition-all border ${activeTab === 'export' ? 'bg-white text-purple-700 shadow-sm border-purple-200' : 'text-gray-500 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
          >
            Xuất kho
          </button>
        </div>

        {activeTab === 'request' ? (
          <DispatchRequestTab onRejectClick={() => setIsRejectModalOpen(true)} />
        ) : (
          <DispatchExportTab />
        )}

      </div>

      <DispatchRejectModal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} />

      <div className="fixed bottom-8 right-8 flex flex-col gap-3 items-end z-40">
        {isReportOpen && (
          <div className="bg-white border border-purple-200 shadow-2xl rounded-2xl w-72 p-4 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <p className="text-xs font-bold text-gray-500 mb-2">Nhập nội dung gửi</p>
            <textarea className="w-full h-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none focus:border-purple-300 resize-none mb-2 text-gray-700"></textarea>
            <div className="flex justify-between items-center px-1">
              <button className="text-gray-400 hover:text-purple-600 transition-colors p-1"><Paperclip size={18}/></button>
              <button onClick={() => setIsReportOpen(false)} className="bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white p-2 rounded-full transition-colors"><Send size={16}/></button>
            </div>
          </div>
        )}
        <button onClick={() => setIsReportOpen(!isReportOpen)} className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-full shadow-xl transition-transform hover:scale-105"><Send size={18} /> Gửi báo cáo</button>
      </div>
    </div>
  );
};