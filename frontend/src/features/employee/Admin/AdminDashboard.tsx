import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../../components/Admin/AdminHeader';
import { StatCard } from '../../../components/Admin/StatCard';

interface StatItem {
  id: number;
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}

const fallbackStats: StatItem[] = [
  { id: 1, title: "Tổng Doanh Thu", value: "125.500.000 ₫", percentage: "15.2", isPositive: true },
  { id: 2, title: "Đơn Hàng Mới", value: "342 Đơn", percentage: "5.4", isPositive: true },
  { id: 3, title: "Khách Hàng Mới", value: "128 Người", percentage: "2.1", isPositive: false },
  { id: 4, title: "Tỷ Lệ Hoàn Trả", value: "1.2%", percentage: "0.5", isPositive: true },
];

export const AdminDashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats');
        if (!res.ok) throw new Error("Backend chưa sẵn sàng");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.warn("Lỗi kết nối Backend. Dùng dữ liệu giả lập cho Dashboard!");
        setStats(fallbackStats);
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
        
        {/* THANH MENU TABS CÓ ROUTER */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
          <Link to="/admin" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap ${path === '/admin' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>Tổng quan Doanh thu</Link>
          <Link to="/admin/promo" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap flex gap-1 items-center ${path === '/admin/promo' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>
            Phê duyệt Khuyến mãi <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ml-1">4</span>
          </Link>
          <Link to="/admin/dispatch" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap flex gap-1 items-center ${path === '/admin/dispatch' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>
            Phê duyệt điều phối <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ml-1">2</span>
          </Link>
          <Link to="/admin/history" className={`px-6 py-2.5 rounded-full font-bold shadow-sm transition-all whitespace-nowrap ${path === '/admin/history' ? 'bg-purple-700 text-white' : 'bg-white text-gray-500 hover:text-purple-700 border border-gray-200 hover:bg-gray-50'}`}>Lịch sử</Link>
        </div>

        {/* NỘI DUNG DASHBOARD */}
        {isLoading ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
            Đang tải dữ liệu thống kê...
          </div>
        ) : (
          <div className="space-y-6">
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