import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../../components/Admin/AdminHeader';
import { StatCard } from '../../../components/Admin/StatCard';
import { RevenueCharts } from './component/RevenueCharts';
import { AdminNavTabs } from '../../../components/Admin/AdminNavTabs';
import { statisticApi } from './api/statisticApi';

interface StatItem {
  id: number;
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}

const fallbackStats: StatItem[] = [
  { id: 1, title: "Tổng Doanh Thu", value: "0 ₫", percentage: "0", isPositive: true },
  { id: 2, title: "Đơn Hàng Mới", value: "0 Đơn", percentage: "0", isPositive: true },
  { id: 3, title: "Tỉ Lệ Hủy", value: "0%", percentage: "0", isPositive: false },
  { id: 4, title: "Chuyển Đổi", value: "0%", percentage: "0", isPositive: true },
];

export const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>(fallbackStats);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('year');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Lấy token từ localStorage (nếu API của bạn có bảo mật)
        const token = localStorage.getItem('techmart_token');
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        // 1. Gọi API lấy số liệu tổng quan (4 thẻ)
        // Lưu ý: Đảm bảo backend có API này và nhận query timeframe
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const statsRes = await fetch(`${apiBase}/api/dashboard/stats?timeframe=${timeframe}`, { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        } else {
          setStats(fallbackStats);
        }

        // 2. Gọi API lấy dữ liệu biểu đồ (API chúng ta đã viết bằng Sequelize)
        let chartApiUrl = `${apiBase}/api/stats/revenue?timeframe=month`;
        
        if (timeframe === 'last_year') {
          const lastYear = new Date().getFullYear() - 1;
          chartApiUrl = `${apiBase}/api/stats/revenue?timeframe=month&year=${lastYear}`;
        } 
        else if (timeframe === 'month') {
          // Nếu chọn "Tháng này", lấy dữ liệu của tháng hiện tại chia theo tuần hoặc ngày
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;
          chartApiUrl = `${apiBase}/api/stats/revenue?timeframe=week&year=${currentYear}&month=${currentMonth}`;
        } 
        else {
          // Nếu chọn "Năm nay"
          const currentYear = new Date().getFullYear();
          chartApiUrl = `${apiBase}/api/stats/revenue?timeframe=month&year=${currentYear}`;

        const chartRes = await fetch(chartApiUrl, { headers });
        if (chartRes.ok) {
          const rawData = await chartRes.json();
          
          // Format lại dữ liệu cho đẹp trước khi đưa vào Recharts
          const formattedChartData = rawData.map((item: any) => {
            const dateObj = new Date(item.period);
            let label = '';

            // Định dạng tên trục X tùy theo timeframe
            if (timeframe === 'year' || timeframe === 'last_year') {
              label = `T${dateObj.getMonth() + 1}`; // Thành "T1", "T2"...
            } else if (timeframe === 'month') {
              label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`; // Thành "01/05", "08/05"...
            } else {
               label = `Năm ${dateObj.getFullYear()}`;
            }

            return {
              period: label, // Nhãn trục X
              revenue: Number(item.revenue) || 0 // Ép kiểu doanh thu về SỐ để Recharts vẽ được
            };
          });

          setChartData(formattedChartData);
        }
      } catch (error) {
        console.error("Lỗi kết nối Backend:", error);
        setStats(fallbackStats);
      } finally {
        setIsLoading(false);
      }
    };  

    fetchDashboardData();
  }, [timeframe]);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        {/* THANH MENU TABS*/}
        <AdminNavTabs promoCount={4} dispatchCount={2} />

        {/* NỘI DUNG DASHBOARD */}
        {isLoading ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
            Đang tải dữ liệu thống kê...
          </div>
        ) : (
          /* Khối container lớn bọc toàn bộ giống hình */
          <div className="bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-4xl p-6 sm:p-8 shadow-sm">
            
            {/* Phần trên: Thẻ thống kê + Bộ lọc thời gian */}
            <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10">
              
              {/* Thẻ thống kê */}
              <div className="flex flex-wrap gap-4">
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

              {/* Bộ lọc góc phải */}
              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)} // Cập nhật state khi User đổi lựa chọn
                  className="bg-white border border-gray-300 text-sm text-gray-700 rounded-full px-5 py-2.5 outline-none cursor-pointer appearance-none min-w-30 hover:border-blue-400 transition-colors"
                >
                  <option value="year">Năm nay</option>
                  <option value="last_year">Năm trước</option>
                  <option value="month">Tháng này</option>
                </select>

                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5">
                  <input 
                      type="date" 
                      className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
                      onChange={(e) => console.log("Từ ngày:", e.target.value)}
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                      type="date" 
                      className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
                      onChange={(e) => console.log("Đến ngày:", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Phần dưới: Biểu đồ */}
            <div className="w-full">
              <RevenueCharts data={chartData} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};