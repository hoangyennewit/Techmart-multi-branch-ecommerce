import React from 'react';

// Khai báo kiểu dữ liệu (gọi là interface)
interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}

export const StatCard = ({ title, value, percentage, isPositive }: StatCardProps) => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col justify-center">
      <p className="text-gray-500 text-sm mb-2 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{value}</h3>
      <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{percentage}%
      </p>
    </div>
  );
};