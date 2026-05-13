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
        const statsRes = await fetch(`http://localhost:5000/api/dashboard/stats?timeframe=${timeframe}`, { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        } else {
          setStats(fallbackStats);
        }

        // 2. Gọi API lấy dữ liệu biểu đồ (API chúng ta đã viết bằng Sequelize)
        let chartApiUrl = `http://localhost:5000/api/stats/revenue?timeframe=month`; // Mặc định vẽ theo tháng của năm nay
        
        if (timeframe === 'last_year') {
          const lastYear = new Date().getFullYear() - 1;
          chartApiUrl = `http://localhost:5000/api/stats/revenue?timeframe=month&year=${lastYear}`;
        } 
        else if (timeframe === 'month') {
          // Nếu chọn "Tháng này", lấy dữ liệu của tháng hiện tại chia theo tuần hoặc ngày
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;
          chartApiUrl = `http://localhost:5000/api/stats/revenue?timeframe=week&year=${currentYear}&month=${currentMonth}`;
        } 
        else {
          // Nếu chọn "Năm nay"
          const currentYear = new Date().getFullYear();
          chartApiUrl = `http://localhost:5000/api/stats/revenue?timeframe=month&year=${currentYear}`;
        }

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
    <div className="min-h-screen bg-[#2c0f48] text-white p-4 sm:p-8 font-sans relative overflow-hidden">
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
          <div className="bg-[#efebf3] backdrop-blur-xl border border-white/5 rounded-4xl p-6 sm:p-8 shadow-2xl">
            
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
              <div className="flex items-center gap-3">
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)} // Cập nhật state khi User đổi lựa chọn
                  className="bg-[#2A1B3D] border border-[#3B2556] text-sm text-gray-300 rounded-full px-5 py-2.5 outline-none cursor-pointer appearance-none min-w-30 hover:border-purple-500 transition-colors"
                >
                  <option value="year">Năm nay</option>
                  <option value="last_year">Năm trước</option>
                  <option value="month">Tháng này</option>
                </select>

                <div className="flex items-center gap-2 bg-[#2A1B3D] rounded-full px-4 py-2.5">
                  <input 
                      type="date" 
                      className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
                      onChange={(e) => console.log("Từ ngày:", e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <input 
                      type="date" 
                      className="bg-transparent text-sm text-gray-200 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
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