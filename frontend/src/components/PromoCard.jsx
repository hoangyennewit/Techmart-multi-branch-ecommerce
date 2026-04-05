import React from 'react';
import { FileText } from 'lucide-react';

export const PromoCard = ({ title, department, budget, goal, fileName, status }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-4">
      
      {/* Cột trái: Thông tin */}
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">
          {department} . Ngân sách: {budget} | Mục tiêu: {goal}
        </p>
        <button className="flex items-center gap-1.5 text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors w-fit">
          <FileText size={16} />
          <span>{fileName}</span>
        </button>
      </div>

      {/* Cột phải: Xử lý Render có điều kiện dựa vào biến 'status' */}
      <div className="flex items-center justify-end min-w-[200px]">
        {status === 'approved' ? (
          // Nếu đã duyệt thì hiện dòng chữ này
          <div className="text-purple-700 font-bold tracking-wide uppercase text-lg">
            Đã phê duyệt!
          </div>
        ) : (
          // Nếu chưa duyệt thì hiện 2 nút bấm
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors shadow-sm">
              Từ chối
            </button>
            <button className="px-6 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition-colors shadow-sm">
              Phê duyệt
            </button>
          </div>
        )}
      </div>

    </div>
  );
};