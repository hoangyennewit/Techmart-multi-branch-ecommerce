import React from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { HistoryCard } from '../components/HistoryCard';

// Dữ liệu giả lập khớp với 7 thẻ trong hình
const historyData = [
  { id: 1, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "approved" },
  { id: 2, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "rejected_self" },
  { id: 3, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "rejected_other" },
  { id: 4, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "approved" },
  { id: 5, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "rejected_self" },
  { id: 6, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "rejected_other" },
  { id: 7, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "approved" },
];

export const AdminHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <AdminHeader />

        {/* Thanh Menu Tabs - Lần này tab "Lịch sử" được Active */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        {/* Khung chính chứa danh sách thẻ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          
          {/* Lưới chia thành 3 cột trên màn hình lớn (lg:grid-cols-3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {historyData.map((item) => (
              <HistoryCard 
                key={item.id}
                title={item.title}
                department={item.department}
                reason={item.reason}
                speed={item.speed}
                fileName={item.file}
                status={item.status}
              />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};