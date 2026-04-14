import React, { useState } from 'react';
import { UserCircle, Printer, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Import 3 component nhỏ
import { HrScheduleTab } from '../../components/Manager/HrScheduleTab';
import { HrSalaryTab } from '../../components/Manager/HrSalaryTab';
import { HrRecordsTab } from '../../components/Manager/HrRecordsTab';

export const ManagerHRPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Quản lý Tab con (Lịch / Lương / Hồ sơ)
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'salary' | 'records'>('schedule');

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

        {/* --- MAIN MENU TABS --- */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <Link to="/store" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Doanh thu & Báo cáo</Link>
          <Link to="/store/hr" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store/hr' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Nhân sự & HR</Link>
          <Link to="/store/inventory" className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${path === '/store/inventory' ? 'bg-purple-700 text-white shadow-md' : 'text-gray-500 hover:text-purple-700 hover:bg-white border border-transparent'}`}>Kho</Link>
        </div>

        {/* --- KHU VỰC NỘI DUNG CHÍNH CỦA HR --- */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-200 min-h-[600px]">
          
          {/* Menu phụ của HR (Lịch / Lương / Hồ sơ) */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveSubTab('schedule')} className={`px-6 py-2.5 rounded-full font-bold transition-all border ${activeSubTab === 'schedule' ? 'bg-white text-purple-700 shadow-sm border-purple-200' : 'text-gray-500 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                Lịch - Xếp ca
              </button>
              <button onClick={() => setActiveSubTab('salary')} className={`px-6 py-2.5 rounded-full font-bold transition-all border ${activeSubTab === 'salary' ? 'bg-white text-purple-700 shadow-sm border-purple-200' : 'text-gray-500 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                Lương - Chấm công
              </button>
              <button onClick={() => setActiveSubTab('records')} className={`px-6 py-2.5 rounded-full font-bold transition-all border ${activeSubTab === 'records' ? 'bg-white text-purple-700 shadow-sm border-purple-200' : 'text-gray-500 bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                Hồ sơ tuyển dụng - Sa thải
              </button>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-100 text-sm transition-colors"><Printer size={16} /> In/Xuất File</button>
              <button className="flex items-center gap-2 px-5 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-full hover:bg-purple-100 text-sm transition-colors"><Eye size={16} /> Xem trước</button>
            </div>
          </div>

          {/* RENDER DỰA TRÊN TAB CON ĐANG CHỌN */}
          <div className="mt-4">
            {activeSubTab === 'schedule' && <HrScheduleTab />}
            {activeSubTab === 'salary' && <HrSalaryTab />}
            {activeSubTab === 'records' && <HrRecordsTab />}
          </div>

        </div>
      </div>
    </div>
  );
};