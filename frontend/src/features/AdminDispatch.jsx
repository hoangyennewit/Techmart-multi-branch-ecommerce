import React from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { DispatchCard } from '../components/DispatchCard';

// Dữ liệu giả lập cho tab Phê duyệt điều phối
const dispatchData = [
  { id: 1, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 2, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 3, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 4, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
  { id: 5, title: "[NHẬP KHO] 50 iPhone 16 Pro Max", department: "Inventory", reason: "Tồn kho hiện tại < 5", speed: "10 máy/ngày", file: "BaoCaoTenfile.pdf", status: "pending" },
];

export const AdminDispatch = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Vẫn dùng lại cái Header cũ cực nhàn */}
        <AdminHeader />

        {/* Thanh Menu Tabs - Lúc này tab "Phê duyệt điều phối" sẽ mang màu tím */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md relative whitespace-nowrap">
            Phê duyệt điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        {/* Khung chính chứa danh sách thẻ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Đổ dữ liệu vào Component DispatchCard */}
            {dispatchData.map((item) => (
              <DispatchCard 
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