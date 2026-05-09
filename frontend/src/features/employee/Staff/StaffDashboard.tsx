import React from 'react';
import { UserCircle } from 'lucide-react';

// Import 3 Component vừa tạo
import { StaffChat } from '../../../components/staff/StaffChat';
import { StaffOrderTable } from '../../../components/staff/StaffOrderTable';
import { StaffSidebar } from '../../../components/staff/StaffSidebar';

export const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 tracking-wide">TechStore</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Nâng tầm cuộc sống số</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white px-6 py-2.5 rounded-full shadow-sm border border-gray-100">
            <div className="text-right flex flex-col justify-center">
              <p className="text-purple-600 text-[11px] font-bold uppercase tracking-widest leading-tight">Nhân viên</p>
              <p className="text-gray-800 font-bold text-sm leading-tight">Nguyễn Văn Tám</p>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <div className="text-left flex flex-col justify-center">
              <p className="text-gray-500 text-xs font-bold leading-tight">Quận 1</p>
              <p className="text-emerald-600 text-xs font-bold leading-tight">Ca sáng</p>
            </div>
            <UserCircle size={38} className="text-gray-400 ml-2" />
          </div>
        </div>

        {/* --- MAIN LAYOUT CỦA NHÂN VIÊN (3 CỘT) --- */}
        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          {/* Cột 1: Chat */}
          <StaffChat />
          
          {/* Cột 2: Bảng Đơn Hàng */}
          <StaffOrderTable />
          
          {/* Cột 3: Sidebar Tra cứu & Thống kê */}
          <StaffSidebar />
        </div>

      </div>
    </div>
  );
};