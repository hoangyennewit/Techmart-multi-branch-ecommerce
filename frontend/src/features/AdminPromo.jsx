import React from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { PromoCard } from '../components/PromoCard';

// Cập nhật dữ liệu: Thêm thuộc tính 'status'
const promoData = [
  { id: 1, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "approved" },
  { id: 2, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
  { id: 3, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
  { id: 4, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
  { id: 5, title: "[VOUCHER] Giảm 10% Tết 2025", department: "Marketing", budget: "50tr đ", goal: "Tăng 20% doanh thu", file: "BaoCaoTenFile.pdf", status: "pending" },
];

export const AdminPromo = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <AdminHeader />

        {/* Thanh Menu Tabs - Đã giảm số lượng thông báo xuống 4 */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">4</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">4</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        {/* Khung chính chứa danh sách các voucher */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Truyền thêm prop status vào PromoCard */}
            {promoData.map((promo) => (
              <PromoCard 
                key={promo.id}
                title={promo.title}
                department={promo.department}
                budget={promo.budget}
                goal={promo.goal}
                fileName={promo.file}
                status={promo.status} 
              />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};