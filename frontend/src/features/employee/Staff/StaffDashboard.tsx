import React from 'react';
import { StaffChat } from './components/StaffChat';
import { OrderProcessing } from './components/OrderProcessing';
import { StaffSidebar } from '../../../components/staff/StaffSidebar';
import { StaffHeader } from './components/StaffHeader';

export const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-400 mx-auto">
        
        {/* --- HEADER --- */}
        <StaffHeader />
        {/* --- MAIN LAYOUT CỦA NHÂN VIÊN (3 CỘT) --- */}
        <div className="flex flex-col xl:flex-row gap-6 items-stretch">
          {/* Chat */}
          <StaffChat />
          
          {/* Xử lý đơn hàng */}
          <OrderProcessing />
          
          {/* Sidebar Tra cứu & Thống kê */}
          {/* <StaffSidebar /> */}
        </div>

      </div>
    </div>
  );
};