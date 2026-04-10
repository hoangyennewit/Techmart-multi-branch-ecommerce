import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { StatCard } from '../../components/Admin/StatCard';

interface StatItem {
  id: number;
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}

// 1. Dữ liệu giả lập (Fallback) phòng khi Backend chưa chạy
const fallbackStats: StatItem[] = [
  { id: 1, title: "Tổng Doanh Thu", value: "125.500.000 ₫", percentage: "15.2", isPositive: true },
  { id: 2, title: "Đơn Hàng Mới", value: "342 Đơn", percentage: "5.4", isPositive: true },
  { id: 3, title: "Khách Hàng Mới", value: "128 Người", percentage: "2.1", isPositive: false },
  { id: 4, title: "Tỷ Lệ Hoàn Trả", value: "1.2%", percentage: "0.5", isPositive: true },
];

export const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. GỌI API LẤY THỐNG KÊ KHI MỞ TRANG
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Thay URL này bằng API thật của backend sau này (VD: /api/stats/overview)
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        if (!res.ok) throw new Error("Backend chưa sẵn sàng");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.warn("Lỗi kết nối Backend. Dùng dữ liệu giả lập cho Dashboard!");
        setStats(fallbackStats); // Dùng data giả nếu API lỗi
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        
        {/* THANH MENU TABS */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {/* Tab này đang ACTIVE -> Đổi sang màu tím */}
          <button className="px-6 py-2 bg-purple-700 text-white font-medium rounded-full shadow-md whitespace-nowrap">
            Tổng quan Doanh thu
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">4</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">
            Lịch sử
          </button>
        </div>

        {/* NỘI DUNG DASHBOARD */}
        {isLoading ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
            Đang tải dữ liệu thống kê...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Lưới chứa 4 thẻ Thống kê (StatCard) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <StatCard 
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  percentage={stat.percentage}
                  isPositive={stat.isPositive}
                />
              ))}
            </div>

            {/* Khung trống để sau này bạn chèn Biểu đồ (Chart) vào */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 font-medium mb-2">Khu vực hiển thị Biểu đồ Doanh thu (Chart)</p>
                <p className="text-sm text-gray-300">Team có thể tích hợp thư viện như Recharts hoặc Chart.js vào đây</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};