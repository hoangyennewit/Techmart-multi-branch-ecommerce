import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RevenueChartsProps {
  data: any[];
}

// Format số tiền (Ví dụ: 15000000 -> 15M)
const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1025] border border-gray-700 p-3 rounded-lg shadow-xl text-white text-sm">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueCharts: React.FC<RevenueChartsProps> = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Biểu đồ 1 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-gray-800 text-sm font-medium mb-6">Biến động Doanh Thu</h4>
        
        <div className="h-80 w-full"> 
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={true} horizontal={true} />              
              
              {/* SỬA dataKey="month" THÀNH "period" */}
              <XAxis dataKey="period" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />              
              
              {/* Tích hợp formatCurrency cho trục Y để số hiển thị gọn gàng */}
              <YAxis tickFormatter={formatCurrency} stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} width={45} />
              
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff1a', strokeWidth: 2 }} />
              <Line type="monotone" name="Doanh thu" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB', strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ 2 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-gray-800 text-sm font-medium mb-6">Biến động Doanh Thu</h4>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} horizontal={true} />
              
              <XAxis dataKey="period" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
              
              <YAxis tickFormatter={formatCurrency} stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} width={45} />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="revenue" name="Doanh thu" fill="#16A34A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};