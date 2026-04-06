import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { StatCard } from '../../components/Admin/StatCard';

// Dữ liệu giả lập cho biểu đồ
const chartData = [
  { name: 'T1', current: 56.43, previous: 70 },
  { name: 'T2', current: 51.73, previous: 68 },
  { name: 'T3', current: 29.38, previous: 45 },
  { name: 'T4', current: 54.41, previous: 70 },
  { name: 'T5', current: 38.78, previous: 55 },
  { name: 'T6', current: 51.31, previous: 65 },
  { name: 'T7', current: 54.22, previous: 68 },
  { name: 'T8', current: 72.52, previous: 88 },
  { name: 'T9', current: 63.94, previous: 85 },
  { name: 'T10', current: 15.2, previous: 30 },
  { name: 'T11', current: 36.28, previous: 40 },
  { name: 'T12', current: 50.67, previous: 65 },
];

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Gọi Component Header */}
        <AdminHeader />

        {/* 2. Thanh Menu Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button className="px-6 py-2 bg-purple-700 text-white rounded-full font-medium shadow-md whitespace-nowrap">Tổng quan Doanh thu</button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt Khuyến mãi
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 relative whitespace-nowrap">
            Phê duyệt điều phối
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">5</span>
          </button>
          
          <button className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-100 whitespace-nowrap">Lịch sử</button>
        </div>

        {/* Khung chính chứa toàn bộ thông số và biểu đồ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          
          {/* 3. Hàng Thống kê & Bộ lọc */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6 mb-10">
            {/* Gọi 4 Component StatCard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
              <StatCard title="Doanh thu" value="1.25B VND" percentage="15" isPositive={true} />
              <StatCard title="Đơn hàng" value="142" percentage="8" isPositive={true} />
              <StatCard title="Tỉ lệ hủy" value="2.5%" percentage="-0.5" isPositive={false} />
              <StatCard title="Chuyển đổi" value="3.2%" percentage="0.2" isPositive={true} />
            </div>

            {/* Bộ lọc thời gian */}
            <div className="flex items-center gap-3 h-[72px]">
              <select className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl outline-none font-medium border border-transparent focus:border-purple-500">
                <option>Năm nay</option>
                <option>Năm ngoái</option>
              </select>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="bg-gray-100 p-2 rounded-xl flex items-center w-24 justify-end"><Calendar size={18}/></div>
                <span>-</span>
                <div className="bg-gray-100 p-2 rounded-xl flex items-center w-24 justify-end"><Calendar size={18}/></div>
              </div>
            </div>
          </div>

          {/* 4. Hàng Biểu đồ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Biểu đồ 1 */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <h4 className="text-center text-sm font-semibold text-gray-700 mb-4">Biến động Doanh Thu</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="current" stroke="#7E22CE" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ 2 */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <h4 className="text-center text-sm font-semibold text-gray-700 mb-4">So sánh biến động Doanh thu</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="previous" stroke="#F87171" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="current" stroke="#7E22CE" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Năm 2025</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-700"></span> Năm 2026</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};