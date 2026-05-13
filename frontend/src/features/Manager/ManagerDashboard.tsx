import React, { useState } from 'react';
import { UserCircle, Calendar, Printer, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Import các Component nhỏ vừa tạo
import { ManagerStatCard } from '../../components/Manager/ManagerStatCard';
import { ManagerChart, ChartData } from '../../components/Manager/ManagerChart';
import { ManagerReportTable, ReportRow } from '../../components/Manager/ManagerReportTable';

export const ManagerDashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  const [activeFilter, setActiveFilter] = useState('week');

  // Dữ liệu Bảng
  const tableData: ReportRow[] = [
    { date: '01/03/2026', revenue: '100.000.000 VND', profit: '20.000.000 VND', topProduct: 'iPhone 15 Plus 256GB...' },
    { date: '02/03/2026', revenue: '125.000.000 VND', profit: '25.000.000 VND', topProduct: 'Galaxy S24 Ultra...' },
    { date: '03/03/2026', revenue: '90.000.000 VND', profit: '18.000.000 VND', topProduct: 'Macbook Air M3...' },
    { date: '04/03/2026', revenue: '150.000.000 VND', profit: '35.000.000 VND', topProduct: 'Màn hình Dell Ultrasharp...' },
  ];

  // Dữ liệu Biểu đồ
  const chartData: ChartData[] = [
    { label: 'T1', actual: 40, target: 60 }, { label: 'T2', actual: 80, target: 50 },
    { label: 'T3', actual: 35, target: 45 }, { label: 'T4', actual: 95, target: 90 },
    { label: 'T5', actual: 85, target: 95 }, { label: 'T6', actual: 40, target: 55 },
    { label: 'T7', actual: 60, target: 80 }, { label: 'T8', actual: 75, target: 90 },
    { label: 'T9', actual: 65, target: 45 }, { label: 'T10', actual: 85, target: 85 },
    { label: 'T11', actual: 60, target: 95 }, { label: 'T12', actual: 90, target: 80 },
  ];

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

        {/* --- KHU VỰC NỘI DUNG CHÍNH --- */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-200">
          
          {/* Bộ lọc (Filters) */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 p-1 rounded-full">
                <button onClick={() => setActiveFilter('week')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'week' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Tuần này</button>
                <button onClick={() => setActiveFilter('month')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'month' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Tháng này</button>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <span>Khác:</span>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full"><span className="text-gray-400">DD/MM/YY</span> <Calendar size={14} className="text-purple-500"/></div>
                <span>-</span>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full"><span className="text-gray-400">DD/MM/YY</span> <Calendar size={14} className="text-purple-500"/></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-100 text-sm transition-colors"><Printer size={16} /> In/Xuất PDF</button>
              <button className="flex items-center gap-2 px-5 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-semibold rounded-full hover:bg-purple-100 text-sm transition-colors"><Eye size={16} /> Xem trước</button>
            </div>
          </div>

          {/* LƯỚI NỘI DUNG (CHART & STATS) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột Trái: Biểu đồ & Bảng chi tiết (Chiếm 2/3) */}
            <div className="lg:col-span-2 space-y-8">
              <ManagerChart data={chartData} />
              <ManagerReportTable data={tableData} />
            </div>

            {/* Cột Phải: Danh sách Tóm tắt & KPI Cards (Chiếm 1/3) */}
            <div className="space-y-8">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 px-5 py-3.5 rounded-full border border-gray-100"><span className="text-gray-500 font-medium text-sm">Tổng doanh thu</span><span className="font-bold text-gray-800">100.000.000 VND</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-5 py-3.5 rounded-full border border-gray-100"><span className="text-gray-500 font-medium text-sm">Lợi nhuận gộp</span><span className="font-bold text-gray-800">100.000.000 VND</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-5 py-3.5 rounded-full border border-gray-100"><span className="text-gray-500 font-medium text-sm">Tổng số đơn hàng</span><span className="font-bold text-gray-800">100.000 đơn</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-5 py-3.5 rounded-full border border-gray-100"><span className="text-gray-500 font-medium text-sm">Khuyến mãi</span><span className="font-bold text-gray-800">SALE 3.3, ...</span></div>
              </div>

              {/* Gọi Component Thẻ Thống Kê */}
              <div className="grid grid-cols-2 gap-4">
                <ManagerStatCard title="Doanh thu" value="1.25B" unit="VND" trendValue="+15%" isPositive={true} />
                <ManagerStatCard title="Đơn hàng" value="142" trendValue="+8%" isPositive={true} />
                <ManagerStatCard title="Tỉ lệ hủy" value="2.5%" trendValue="-0.5%" isPositive={false} />
                <ManagerStatCard title="Chuyển đổi" value="3.2%" trendValue="+0.2%" isPositive={true} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};